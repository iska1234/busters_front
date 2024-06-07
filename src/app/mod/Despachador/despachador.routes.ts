import { Routes } from '@angular/router';
import InicioComponent from './inicio/inicio.component';
import UsersComponent from './users/users.component';
import ChoferesComponent from './choferes/choferes.component';
import LayoutComponent from './layout/layout.component';
import OrdersComponent from './orders/orders.component';
import DetailsComponent from './orders/details/details.component';



export const DESPACHADOR_ROUTES: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: LayoutComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'users', component: UsersComponent },
      { path: 'drivers', component: ChoferesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'order-details/:id', component: DetailsComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
