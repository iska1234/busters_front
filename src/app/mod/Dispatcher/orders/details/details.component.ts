import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../../core/services/orders.service';
import { WDetailsMapComponent } from '../../../../shared/despachador/orders/details-map/details-map.component';
import { translateStatus } from '../../../../core/utils/translateStatus.util';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, WDetailsMapComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export default class DetailsComponent {
  order: any;

  constructor(private route: ActivatedRoute, private ordersService: OrdersService) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.params['id'];
    this.ordersService.getOrderById(orderId).subscribe(
      data => {
        this.order = data;
      },
      error => {
        console.error('Error fetching order details', error);
      }
    );
  }

  translateStatus(status: string): string {
    return translateStatus(status);
  }
}
