import { Component, inject } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { NotificationIconComponent } from "../../components/notification-icon/notification-icon.component";
import { SidebarService } from '../../sections/sidebar/service/sidebar.service';

@Component({
  selector: 'app-header',
  imports: [SearchBarComponent, NotificationIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sidebarService = inject(SidebarService);

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
