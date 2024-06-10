import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/despachador/sidebar/sidebar.component';
import { WFooterComponent } from '../../../shared/ui/footer/footer.component';
import { WHeaderComponent } from '../../../shared/ui/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    WHeaderComponent,
    WFooterComponent,
    SidebarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
