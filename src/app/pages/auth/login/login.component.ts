import { Component, inject, OnInit } from '@angular/core';
import { SidebarService } from '../../../sections/sidebar/service/sidebar.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  sidebarService = inject(SidebarService);

  ngOnInit() {
      this.sidebarService.closeSidebar();
  }
}
