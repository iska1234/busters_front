import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { userGuard } from './core/guards/user.guard';
import { despachadorGuard } from './core/guards/despachador.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./mod/Auth/login/login.component'),
    canMatch: [authGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./mod/Admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    canMatch: [adminGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./mod/User/user.routes').then((r) => r.USER_ROUTES),
    canMatch: [userGuard],
  },
  {
    path: 'dispatcher',
    loadChildren: () => import('./mod/Dispatcher/dispatcher.routes').then((r) => r.DISPATCHER_ROUTES),
    canActivate:[dispatchGuard]
  },
];
