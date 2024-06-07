import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrdersService } from '../../../../core/services/orders.service';
import { Observable } from 'rxjs';
import { IOrders } from '../../../../core/models/IOrders';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'w-orders-table',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css'
})
export class WOrdersTableComponent {
  orders$!: Observable<IOrders[]>;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.orders$ = this.ordersService.getAllOrders();
  }
}
