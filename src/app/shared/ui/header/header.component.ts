import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { UserDataService } from '../../../core/services/user-data.service';

@Component({
  selector: 'w-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',

})
export class WHeaderComponent {
  tks = inject(TokenService);
  udata = inject(UserDataService)
  router = inject(Router)

  closeSesion(){
    this.tks.rmToken();
    this.udata.removeRole();
    this.udata.removeUserId();

    this.router.navigateByUrl('/login');
  }
}
