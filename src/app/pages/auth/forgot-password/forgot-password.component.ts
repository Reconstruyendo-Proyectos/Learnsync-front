import { Component, HostListener, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-forgot-password',
  imports: [ButtonComponent, InputComponent, RouterModule, ModalComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
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

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    this.showImage = window.innerWidth > 768;
  }
}
