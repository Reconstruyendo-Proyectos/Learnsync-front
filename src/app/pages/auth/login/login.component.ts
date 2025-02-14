import { Component, inject, OnInit } from '@angular/core';
import { SidebarService } from '../../../sections/sidebar/service/sidebar.service';
import { InputComponent } from "../../../components/input/input.component";
import { ButtonComponent } from "../../../components/button/button.component";
import { HoverStyleDirective } from '../../../directives/hover-style.directive';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  sidebarService = inject(SidebarService);

  ngOnInit() {
      this.sidebarService.closeSidebar();
  }
}
