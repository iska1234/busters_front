import { Routes } from '@angular/router';
import HomeComponent from './home/home.component';
import UsersComponent from './users/users.component';
import DriverComponent from './driver/driver.component';
import DispatcherComponent from './dispatcher.component';
import OrdersComponent from './orders/orders.component';
import DetailsComponent from './orders/details/details.component';



export const DESPACHADOR_ROUTES: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: DispatcherComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'drivers', component: DriverComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'order-details/:id', component: DetailsComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
