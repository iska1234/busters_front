import { Routes } from '@angular/router';
import InicioComponent from './inicio/inicio.component';
import UsersComponent from './users/users.component';
import ChoferesComponent from './choferes/choferes.component';
import LayoutComponent from './layout/layout.component';



export const DESPACHADOR_ROUTES: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: LayoutComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'users', component: UsersComponent },
      { path: 'drivers', component: ChoferesComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];