import { inject } from '@angular/core';
import type { CanMatchFn } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import {Router} from "@angular/router";


export const dispatchGuard: CanMatchFn = (route, segments) => {
  const role = inject(UserDataService);
  const router = inject(Router);
  if(role.getRole() === 'despachador'){
    return true;
  }else{
    return router.createUrlTree(['/']);
  }
};
