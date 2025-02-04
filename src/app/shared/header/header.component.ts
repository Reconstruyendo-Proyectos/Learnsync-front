import { Component } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { NotificationIconComponent } from "../../components/notification-icon/notification-icon.component";

@Component({
  selector: 'app-header',
  imports: [SearchBarComponent, NotificationIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
