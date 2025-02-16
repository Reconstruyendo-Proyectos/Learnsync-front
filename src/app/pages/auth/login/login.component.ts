import { Component, HostListener, inject, OnInit } from '@angular/core';
import { SidebarService } from '../../../sections/sidebar/service/sidebar.service';
import { InputComponent } from "../../../components/input/input.component";
import { ButtonComponent } from "../../../components/button/button.component";
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ButtonComponent, RouterModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  showImage = true;

  ngOnInit() {
      this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    this.showImage = window.innerWidth > 768;
  }
}

