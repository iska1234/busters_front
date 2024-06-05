import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environments';
import { ILugar } from '../../../core/models/ILugar';
import { WebSocketService } from '../../../core/services/web-socket.service';
import { HttpClient } from '@angular/common/http';

interface RespMarcadores{
  [key:string]:ILugar
}

@Component({
  selector: 'w-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class WMapComponent {
  mapa!: mapboxgl.Map;

  constructor(private http: HttpClient, private wsService: WebSocketService) {}

  lugares: RespMarcadores = {};
  ngOnInit() {
    this.http.get<RespMarcadores>('http://localhost:5500/mapa/get').subscribe(lugares=>{
      console.log(lugares);
      this.lugares=lugares;
      this.crearMapa();
    })
  }

  escucharSockets(){
    //marcador-nuevo

    //marcador-mover

    //marcador-borrar


  }


  crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: environment.mapboxAccessToken,
      center: [ -77.00130084281118, -12.116866849976887],
      zoom:11.5,
    });

    for(const [id, marcador] of Object.entries(this.lugares)){
      this.agregarMarcador(marcador);
    }
  }

  agregarMarcador(marcador: ILugar) {

    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;
    const btnBorrar = document.createElement('button')
    btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append(h2, btnBorrar);

    const customPopup = new mapboxgl.Popup({
      offset:25,
      closeOnClick:false
    }).setDOMContent(div)

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color,
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup(customPopup)
    .addTo(this.mapa);

    marker.on('drag', () => {
      const lngLat = marker.getLngLat();
      console.log(lngLat)

    })

    btnBorrar.addEventListener('click', () => {
      marker.remove();

    })
  }


  crearMarcador(){
    const customMarker: ILugar = {
      id: new Date().toISOString(),
      lng: -77.00130084281118,
      lat: -12.116866849976887,
      nombre: 'Sin nombre',
      color:'#'+Math.floor(Math.random()*16777215).toString(16)
    }
    this.agregarMarcador(customMarker)

    //emitir marcador nuevo
    this.wsService.emit('marcador-nuevo', customMarker);
  }
}
