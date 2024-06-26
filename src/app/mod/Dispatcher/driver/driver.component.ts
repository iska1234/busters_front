import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { WebsocketService } from '../../../core/services/web-socket.service';
import { WMapComponent } from '../../../shared/despachador/choferes/choferes-map/map.component';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, WMapComponent],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css',
})
export class DriverComponent {

  constructor(private wsService: WebsocketService){

  }
}
