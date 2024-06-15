import {Routes} from "@angular/router";
import { HomeComponent,UsersComponent,DriverComponent,OrdersComponent } from "./index"
import DetailsComponent from "./orders/details/details.component";

export const DISPATCHER_ROUTES: Routes = [
  {
    path: '',
    title: 'Mis Tareas Traductor',
    loadComponent:()=>import('./dispatcher.component'),
    children: [
      { path: 'dashboard', component: HomeComponent },
      { path: 'clients', component: UsersComponent },
      { path: 'drivers', component: DriverComponent },
      { path: 'orders', component: OrdersComponent},
      { path: 'order-details/:id', component: DetailsComponent },
    ],
  },

]
