import { Routes } from '@angular/router';
import {AuthComponent} from "./auth.component";
import {RegisterComponent,LoginComponent} from './index'

export const AUTH_ROUTES:Routes = [
  {
    path:'', component: AuthComponent, children:[
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
]
