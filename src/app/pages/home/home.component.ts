import { Component } from '@angular/core';
import { SidebarComponent } from "../../sections/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  imports: [SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
