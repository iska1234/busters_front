import { Routes } from '@angular/router';
import UserComponent from './user.component';

export const USER_ROUTES: Routes = [
  { path: '', title: 'Home', component: UserComponent },
  { path: '**', redirectTo: '' },
];
