import { Component, HostListener } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalComponent } from "../../../components/modal/modal.component";

@Component({
  selector: 'app-register',
  imports: [ButtonComponent, InputComponent, RouterModule, NgIf, ModalComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  showImage = true;
  isModalVisible = false;

  ngOnInit() {
    this.checkScreenWidth();
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    this.showImage = window.innerWidth > 768;
  }
}
