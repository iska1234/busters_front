import {
  Component,
  ElementRef,
  EventEmitter,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environments';
import { ILugar } from '../../../core/models/ILugar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../../core/services/web-socket.service';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Socket } from 'ngx-socket-io';

interface RespMarcadores {
  [key: string]: ILugar;
}

export class WayPoints {
  start: any;
  end: any;
}

@Component({
  selector: 'w-map',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class WMapComponent {
  mapa!: mapboxgl.Map;
  lugares: RespMarcadores = {};
  markersMapbox: { [id: string]: mapboxgl.Marker } = {};

  @ViewChild('asGeocoder') asGeocoder!: ElementRef;

  wayPoints: WayPoints = { start: null, end: null };
  modeInput = 'start';

  cbAddress: EventEmitter<any> = new EventEmitter<any>();
  dataWayPoints: Array<any> = [];
  //
  markerDriver: any = null;

  constructor(
    private http: HttpClient,
    private wsService: WebsocketService,
    private renderer2: Renderer2,
    private socket: Socket
  ) {}

  ngOnInit() {
    this.http
      .get<RespMarcadores>('http://localhost:5500/mapa/get')
      .subscribe((lugares) => {
        console.log(lugares);
        this.lugares = lugares;
        this.crearMapa();
        this.socket.fromEvent<{ coords: any }>('position').subscribe(({ coords }) => {
          this.addMarkerCustom(coords);
      });
      });
    this.escucharSockets();
  }

  escucharSockets() {
    //marcador-nuevo
    this.wsService
      .listen<ILugar>('marcador-nuevo')
      .subscribe((marcador) => this.agregarMarcador(marcador));
    //marcador-mover
    this.wsService
      .listen<ILugar>('marcador-mover')
      .subscribe((marcador) =>
        this.markersMapbox[marcador.id].setLngLat([marcador.lng, marcador.lat])
      );
    //marcador-borrar
    this.wsService.listen<string>('marcador-borrar').subscribe((id) => {
      if (this.markersMapbox[id]) {
        this.markersMapbox[id].remove();
        delete this.markersMapbox[id];
      }
    });
  }

  crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: environment.mapboxAccessToken,
      center: [-77.00130084281118, -12.116866849976887],
      zoom: 11.5,
    });

    //this.mapa.addControl(new mapboxgl.NavigationControl)
    const geocoder = new MapboxGeocoder({
      accessToken: environment.mapboxAccessToken,
      mapboxgl: mapboxgl,
    });

    this.renderer2.appendChild(
      this.asGeocoder.nativeElement,
      geocoder.onAdd(this.mapa)
    );

    geocoder.on('result', ($event) => {
      const { result } = $event;
      const center = result.center;
      const longitude = center[0];
      const latitude = center[1];

      const id = result.id;
      const placeName = result.place_name;
      geocoder.clear();

      this.cbAddress.emit(result);
    });

    this.cbAddress.subscribe((getPoint) => {
      if (this.modeInput === 'start') {
        this.wayPoints.start = getPoint;
      }

      if (this.modeInput === 'end') {
        this.wayPoints.end = getPoint;
      }
    });

    for (const [id, marcador] of Object.entries(this.lugares)) {
      this.agregarMarcador(marcador);
    }
  }

  cargarCoordenadas(coords: any): void {
    const url = [
      `https://api.mapbox.com/directions/v5/mapbox/cycling/`,
      `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
      `?steps=true&geometries=geojson&access_token=${environment.mapboxAccessToken}`,
    ].join('');

    this.http.get(url).subscribe((res: any) => {
      const data = res.routes[0];
      const route = data.geometry.coordinates;

      this.mapa.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route,
          },
        },
      });

      this.mapa.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#23233A',
          'line-width': 5,
        },
      });

      this.dataWayPoints = route;
      //adaptar al perimetro
      this.mapa.fitBounds([route[0], route[route.length - 1]], {
        padding: 100,
      });

      this.wsService.emit('find-driver', {points:route})
    });
  }

  dibujarRuta(): void {
    console.log(this.wayPoints);
    const coords = [this.wayPoints.start.center, this.wayPoints.end.center];
    this.cargarCoordenadas(coords);
  }

  changeMode(mode: string): void {
    this.modeInput = mode;
  }

  agregarMarcador(marcador: ILugar) {
    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;
    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append(h2, btnBorrar);

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false,
    }).setDOMContent(div);

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color,
    })
      .setLngLat([marcador.lng, marcador.lat])
      .setPopup(customPopup)
      .addTo(this.mapa);

    marker.on('drag', () => {
      const lngLat = marker.getLngLat();

      //marcador-mover
      const nuevoMarcador = {
        id: marcador.id,
        ...lngLat,
      };
      this.wsService.emit('marcador-mover', nuevoMarcador);
    });

    btnBorrar.addEventListener('click', () => {
      marker.remove();

      //mandar al servidor
      this.wsService.emit('marcador-borrar', marcador.id);
    });

    this.markersMapbox[marcador.id] = marker;
  }

  crearMarcador() {
    const customMarker: ILugar = {
      id: new Date().toISOString(),
      lng: -77.00130084281118,
      lat: -12.116866849976887,
      nombre: 'Sin nombre',
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    };
    this.agregarMarcador(customMarker);

    //emitir marcador nuevo
    this.wsService.emit('marcador-nuevo', customMarker);
  }

  testMarker(): void {
    this.addMarkerCustom([-77.00130084281118, -12.116866849976887]);
  }

  addMarkerCustom(coords: any): void {
    const el = document.createElement('div');

    el.className = 'marker';
    el.style.backgroundImage = `url(assets/icons/chofer.svg`;
    el.style.width = `50px`;
    el.style.height = `50px`;
    el.style.backgroundSize = '100%';
    if(!this.markerDriver){
      this.markerDriver = new mapboxgl.Marker(el)
    }else{
      this.markerDriver.setLngLat(coords).addTo(this.mapa);
    }

  }
}
