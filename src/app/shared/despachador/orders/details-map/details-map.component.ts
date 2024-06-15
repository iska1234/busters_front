import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../../environments/environments';
import { WebsocketService } from '../../../../core/services/web-socket.service';
import { HttpClient } from '@angular/common/http';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ILugar } from '../../../../core/models/ILugar';
import { RespMarcadores, WayPoints } from '../../../../core/models/IMapas';
import { Socket } from 'ngx-socket-io';



@Component({
  selector: 'w-details-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-map.component.html',
  styleUrl: './details-map.component.css'
})
export class WDetailsMapComponent {

  @Input() orderLat!: number;
  @Input() orderLng!: number;
  @Input() userid!: any;

  mapa!: mapboxgl.Map;
  rutaCreada: boolean = false;
  modeInput = 'start';
  wayPoints: WayPoints = { start: null, end: null };
  lugares: RespMarcadores = {};
  markersMapbox: { [id: string]: mapboxgl.Marker } = {};
  markerDriver: any = null;

  cbAddress: EventEmitter<any> = new EventEmitter<any>();
  constructor(private http: HttpClient,
    private wsService: WebsocketService,
    private socket: Socket,
    public cdr: ChangeDetectorRef
){}

  ngOnInit(){
    this.http
      .get<RespMarcadores>('http://localhost:5500/mapa/get')
      .subscribe((lugares) => {
        this.lugares = lugares;
        this.crearMapa();
        this.socket.fromEvent<{  lat: number; lng: number }>('position-test').subscribe(
          (data) => {
            console.log(`Nueva posición recibida: usuariolatitud ${data.lat}, longitud ${data.lng}`);
            const coords = [data.lng, data.lat];
            this.addMarkerChofer(coords)
            }
            );
      });
      this.escucharSockets();
  }

  escucharSockets() {
    //marcador-nuevo
    this.wsService
      .listen<ILugar>('marcador-nuevo')
      .subscribe((marcador) => this.agregarMarcador(marcador));
  }

  crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: environment.mapboxAccessToken,
      center: [-77.00130084281118, -12.116866849976887],
      zoom: 11.5,
    });

    this.mapa.on('load', () => {
      const geocoder = new MapboxGeocoder({
        accessToken: environment.mapboxAccessToken,
        mapboxgl: mapboxgl,
      });

      geocoder.on('result', ($event) => {
        const { result } = $event;
        const center = result.center;
        geocoder.clear();
        this.cbAddress.emit(result);
      });

      this.cbAddress.subscribe((getPoint) => {
        if (this.modeInput === 'start') {
          this.wayPoints.start = getPoint;
        } else if (this.modeInput === 'end') {
          this.wayPoints.end = getPoint;
        }
      });

      for (const [id, marcador] of Object.entries(this.lugares)) {
        this.agregarMarcador(marcador);
      }

      this.dibujarRuta();
    });
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

  dibujarRuta(): void {
    if (!this.orderLat || !this.orderLng) return;

    const coords = [[-77.016902, -12.126417], [this.orderLng, this.orderLat]];

    this.agregarMarcadorConIcono(coords[0][0], coords[0][1], 'assets/icons/start.svg');
    this.agregarMarcadorConIcono(coords[1][0], coords[1][1], 'assets/icons/person.svg');

    this.cargarCoordenadas(coords);
    this.rutaCreada = true;
    console.log(coords);
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


      //adaptar al perimetro
      this.mapa.fitBounds([route[0], route[route.length - 1]], {
        padding: 100,
      });

      console.log(route)
      this.wsService.emit('find-driver', {points:route})
    });
  }

  agregarMarcadorConIcono(lng: number, lat: number, iconUrl: string) {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${iconUrl})`;
    el.style.width = `30px`;
    el.style.height = `30px`;
    el.style.backgroundSize = '100%';

    const marker = new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .addTo(this.mapa);

    return marker;
  }


  addMarkerChofer(coords: any): void {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(assets/icons/chofer.svg`;
    el.style.width = `30px`;
    el.style.height = `30px`;
    el.style.backgroundSize = '100%';

    // Crear el marcador en Mapbox
    if (!this.markerDriver) {
      this.markerDriver = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .addTo(this.mapa);
    } else {
      this.markerDriver.setLngLat(coords);
    }
  }


}
