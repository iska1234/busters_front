import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Event, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { UserDataService } from '../../../core/services/user-data.service';
import { RouteService } from '../../despachador/sidebar/service/route.service';
import { SafeHtml } from '@angular/platform-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'w-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class WHeaderComponent {
  routes: { path: string, label: string, icon: SafeHtml }[] = [];
  activeRoute: string = '';

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userDataService: UserDataService,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.routes = this.routeService.getRoutes();
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeRoute = event.urlAfterRedirects;
    });
  }

  closeSession(): void {
    this.tokenService.rmToken();
    this.userDataService.removeRole();
    this.userDataService.removeUserId();
    this.router.navigateByUrl('/login');
  }

  isActive(route: string): boolean {
    return this.activeRoute.includes(route);
  }


}
