import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { WMapComponent } from '../../../shared/despachador/map/map.component';
import { WebsocketService } from '../../../core/services/web-socket.service';

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
