import { Component, inject, OnInit } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { NotificationIconComponent } from "../../components/notification-icon/notification-icon.component";
import { SidebarService } from '../../sections/sidebar/service/sidebar.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [SearchBarComponent, NotificationIconComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isSidebarOpen = false;

  sidebarService = inject(SidebarService);

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    this.sidebarService.isOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen ?? false;
    });
  }
}
