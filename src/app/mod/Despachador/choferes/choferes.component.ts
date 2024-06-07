import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { WebsocketService } from '../../../core/services/web-socket.service';
import { WMapComponent } from '../../../shared/despachador/choferes/choferes-map/map.component';

@Component({
  selector: 'app-choferes',
  standalone: true,
  imports: [CommonModule, WMapComponent],
  templateUrl: './choferes.component.html',
  styleUrl: './choferes.component.css',
})
export default class ChoferesComponent {

  constructor(private wsService: WebsocketService){

  }
}
