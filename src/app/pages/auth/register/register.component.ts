import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from "../../../components/modal/modal.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../api/auth/auth-api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [ButtonComponent, InputComponent, RouterModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  showImage = true;
  isModalVisible = false;
  submitting = false;

  private fb = inject(FormBuilder);
  private authApi = inject(AuthApiService);
  private notify = inject(NotificationService);
  private destroyRef = inject(DestroyRef);

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
    this.checkScreenWidth();
  }

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const { username, email, password } = this.registerForm.value as any;
    this.authApi.register({ username, email, password }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isModalVisible = true;
        this.notify.success('Cuenta registrada. Revisa tu email para activarla.');
      },
      error: (err) => {
        const msg = err?.error?.message ?? err?.error ?? 'No se pudo registrar.';
        this.notify.error(msg);
      },
      complete: () => (this.submitting = false),
    });
  }

  openModal() { this.isModalVisible = true; }
  closeModal() { this.isModalVisible = false; }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    this.showImage = window.innerWidth > 768;
  }
}
