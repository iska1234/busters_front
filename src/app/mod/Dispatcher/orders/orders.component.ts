import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { WOrdersTableComponent } from '../../../shared/despachador/orders/orders-table/orders-table.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, WOrdersTableComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

}
