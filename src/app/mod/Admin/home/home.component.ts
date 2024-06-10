import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { WHeaderComponent } from '../../../shared/ui/header/header.component';
import { WFooterComponent } from '../../../shared/ui/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    WHeaderComponent,
    WFooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {


}
