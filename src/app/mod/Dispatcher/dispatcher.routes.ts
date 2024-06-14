import {Routes} from "@angular/router";
import DispatcherComponent from "./dispatcher.component";
import { HomeComponent,UsersComponent,DriverComponent,OrdersComponent } from "./index"
import DetailsComponent from "./orders/details/details.component";

export const DISPATCHER_ROUTES: Routes = [
  {
    path:'',component:DispatcherComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'drivers', component: DriverComponent },
      { path: 'orders', component: OrdersComponent},
      { path: 'order-details/:id', component: DetailsComponent },
    ]
  }
]
