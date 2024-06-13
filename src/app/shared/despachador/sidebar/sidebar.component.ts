import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { RouterLink} from '@angular/router';
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
export class SidebarComponent implements OnInit {
  routes: { path: string, label: string, icon: SafeHtml }[] = [];
  urlBase:string;
  show: boolean = true;
  constructor(private routeService: RouteService) {
    this.urlBase = '';
  }

  ngOnInit(): void {
    this.routes = this.routeService.getRoutes();
    this.urlBase = '/dispatcher';
    console.log(this.urlBase);
  }
  onHidden(){
    this.show=!this.show;
  }
}
