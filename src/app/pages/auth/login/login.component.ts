declare const google: any;
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../../components/input/input.component";
import { ButtonComponent } from "../../../components/button/button.component";
import { Router, RouterModule } from '@angular/router';
import { AuthApiService } from '../../../../api/auth/auth-api.service';
import { StorageService } from '../../../../api/storage/storage.service';
import { AuthRequestDTO, AuthResponseDTO } from '../../../../api/auth/interfaces/auth-interfaces';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ButtonComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showImage = true;
  formError = '';

  // Injects
  router = inject(Router);
  authApiService = inject(AuthApiService);
  storageService = inject(StorageService);
  fb = inject(FormBuilder);

  authRequest: AuthRequestDTO = {
    username: '',
    password: ''
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    this.checkScreenWidth();
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (res: any) => this.handleLogin(res)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      size: 'large',
      shape: 'rectangle',
      width: 240,
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    this.showImage = window.innerWidth > 768;
  }

  login() {
    if (this.loginForm.valid) {
      this.authRequest.username = this.loginForm.controls.username.value as string;
      this.authRequest.password = this.loginForm.controls.password.value as string;
      this.authApiService.login(this.authRequest).subscribe({
        next: (res: AuthResponseDTO) => {
          this.authApiService.validateLogin();
          this.storageService.setAuthData(res as AuthResponseDTO);
          this.storageService.setLoginMethod('Normal');
          this.router.navigateByUrl('/');
        },
        error: (error: any) => {
          this.formError = error?.error?.message ?? error?.error ?? 'Error al iniciar sesión';
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private handleLogin(response: any) {
    const payload = response.credential as string;
    this.authApiService.loginWithGoogle(payload).subscribe({
      next: (res: AuthResponseDTO) => {
        this.authApiService.validateLogin();
        this.storageService.setAuthData(res as AuthResponseDTO);
        this.storageService.setLoginMethod('Google');
        this.router.navigateByUrl('/');
      },
      error: (error: any) => {
        this.formError = error?.error?.message ?? error?.error ?? 'Error al iniciar con Google';
      },
    });
  }
}

