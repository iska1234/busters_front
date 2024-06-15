import { Routes } from '@angular/router';
import {dispatchGuard} from "./core/guards/despachador.guard";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', title:'Login',
    loadChildren: ()=>import ('./mod/Auth/auth.routes').then((r)=>r.AUTH_ROUTES),
    canActivate:[authGuard]
  },
  { path: 'admin',
    loadChildren: () => import('./mod/Admin/admin.routes').then((r) => r.ADMIN_ROUTES),
  },
  {
    path: 'user',
    loadChildren: () => import('./mod/User/user.routes').then((r) => r.USER_ROUTES),
  },
  {
    path: 'dispatcher',
    loadChildren: () => import('./mod/Dispatcher/dispatcher.routes').then((r) => r.DISPATCHER_ROUTES),
    canActivate:[dispatchGuard]
  },
];
