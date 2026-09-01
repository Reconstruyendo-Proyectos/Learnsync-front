import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthApiService } from '../../../../api/auth/auth-api.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-confirm',
  imports: [RouterModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit {
  status = signal<'loading' | 'success' | 'error'>('loading');
  message = signal('');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authApi = inject(AuthApiService);
  private notify = inject(NotificationService);

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (!token) {
      this.status.set('error');
      this.message.set('Token no proporcionado.');
      return;
    }
    this.authApi.confirmToken(token).subscribe({
      next: () => {
        this.status.set('success');
        this.message.set('Cuenta activada correctamente.');
        this.notify.success('Cuenta activada. Ya puedes iniciar sesión.');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.status.set('error');
        const msg = err?.error?.message ?? err?.error ?? 'Token inválido o expirado.';
        this.message.set(msg);
        this.notify.error(msg);
      },
    });
  }
}
