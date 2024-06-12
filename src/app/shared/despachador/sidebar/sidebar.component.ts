import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { RouteService } from './service/route.service';
import {routes} from "../../../app.routes";
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    CommonModule,RouterLink, FormsModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  routes: { path: string, label: string, icon: SafeHtml }[] = [];
  router = inject(Router)
  urlBase:string = '';
  show: boolean = true;
  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.routes = this.routeService.getRoutes();
    this.urlBase = this.router.url;
    console.log(this.urlBase);
  }
  onHidden(){
    this.show=!this.show;
  }
}
