import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environments';
import { ILugar } from '../../../core/models/ILugar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../../core/services/web-socket.service';

interface RespMarcadores {
  [key: string]: ILugar;
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

  constructor(private http: HttpClient, private wsService: WebsocketService) {}

  lugares: RespMarcadores = {};
  markersMapbox: { [id: string]: mapboxgl.Marker } = {};

  ngOnInit() {
    this.http
      .get<RespMarcadores>('http://localhost:5500/mapa/get')
      .subscribe((lugares) => {
        console.log(lugares);
        this.lugares = lugares;
        this.crearMapa();
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

    for (const [id, marcador] of Object.entries(this.lugares)) {
      this.agregarMarcador(marcador);
    }
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
}
