import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WebSocketService } from '../../../core/services/web-socket.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-choferes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choferes.component.html',
  styleUrl: './choferes.component.css'
})
export default class ChoferesComponent {

}
