import { Component } from '@angular/core';
import { WFooterComponent } from '../../shared/ui/footer/footer.component';
import { WHeaderComponent } from '../../shared/ui/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/despachador/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dispatcher',
  standalone: true,
  imports: [    CommonModule,
    RouterOutlet,
    WHeaderComponent,
    WFooterComponent,
    SidebarComponent,],
  templateUrl: './dispatcher.component.html',

})
export default class DispatcherComponent {

}
