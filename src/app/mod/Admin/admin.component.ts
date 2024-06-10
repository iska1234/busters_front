import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {WHeaderComponent} from "../../shared/ui/header/header.component";
import {WFooterComponent} from "../../shared/ui/footer/footer.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, WHeaderComponent, WFooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
