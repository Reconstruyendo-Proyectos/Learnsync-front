import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { SidebarComponent } from "./sections/sidebar/sidebar.component";
import { SidebarService } from './sections/sidebar/service/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'learnsync';
  isSidebarOpen = false;
  isAuthRoute = false;
  sidebarService = inject(SidebarService);
  router = inject(Router);

  ngOnInit(): void {
    this.sidebarService.isOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen ?? false;
    });

    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isAuthRoute = ['/login', '/register', '/forgot-password'].includes(currentRoute);
    })
  }
}
