import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { RouteService } from './service/route.service';
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

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.routes = this.routeService.getRoutes();
  }
}
