import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WOrdersCardsComponent } from '../../../shared/despachador/orders-cards/orders-cards.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, WOrdersCardsComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export default class OrdersComponent {

}
