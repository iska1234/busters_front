import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WHeaderComponent } from '../../shared/ui/header/header.component';
import { WFooterComponent } from '../../shared/ui/footer/footer.component';
import { SidebarComponent } from '../../shared/despachador/sidebar/sidebar.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    WHeaderComponent,
    WFooterComponent,
    SidebarComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {}
