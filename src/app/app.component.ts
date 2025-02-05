import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { SidebarComponent } from "./sections/sidebar/sidebar.component";
import { SidebarService } from './sections/sidebar/service/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'learnsync';
  isSidebarOpen = false;

  sidebarService = inject(SidebarService)

  ngOnInit(): void {
    this.sidebarService.isOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }
}
