import { Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import { HomeComponent } from './index'

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children:[
      { path:'', title:'Home',component:HomeComponent}
    ]
  }
];
