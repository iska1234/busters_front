import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import {UserDataService} from "../services/user-data.service";

export const authGuard: CanActivateFn = (route, state) => {

  const tkService = inject(TokenService);
  const router = inject(Router);

  if(tkService.getToken()){
    const role = inject(UserDataService);
    return router.createUrlTree(['/'+'dispatcher']);
  }else{
    return true;
  }
}
