import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { WebSocketService } from '../../../core/services/web-socket.service';
import { Socket } from 'ngx-socket-io';
import { WMapComponent } from '../../../shared/despachador/map/map.component';

@Component({
  selector: 'app-choferes',
  standalone: true,
  imports: [CommonModule, WMapComponent],
  templateUrl: './choferes.component.html',
  styleUrl: './choferes.component.css',
})
export default class ChoferesComponent {

  constructor(private wsService: WebSocketService){

  }
}
