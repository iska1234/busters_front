import { Routes } from '@angular/router';
import UserComponent from './user.component';

export const USER_ROUTES: Routes = [

  {
    path: '',
    title: 'Mis Tareas Traductor',
    loadComponent:()=>import('./user.component'),
    children: [

    ],
  },
  { path: '**', redirectTo: '' },
];
