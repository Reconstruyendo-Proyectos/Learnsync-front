import { Component, HostListener, inject } from '@angular/core';
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
  isSmallScreen = window.innerWidth <= 768;

  sidebarService = inject(SidebarService);

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth <= 768;
  }
  
  toggleSidebar(): void {
    if (this.isSmallScreen) {
      this.sidebarService.toggleSidebar();
    }
  } 
}
