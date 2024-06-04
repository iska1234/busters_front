import { Component } from '@angular/core';
import { WFooterComponent } from '../../../shared/ui/footer/footer.component';
import { WHeaderComponent } from '../../../shared/ui/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/despachador/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [    CommonModule,
    RouterOutlet,
    WHeaderComponent,
    WFooterComponent,
    SidebarComponent,],
  templateUrl: './layout.component.html',

})
export default class LayoutComponent {

}
