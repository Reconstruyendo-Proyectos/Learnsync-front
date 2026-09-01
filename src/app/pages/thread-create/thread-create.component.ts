import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadApiService } from '../../../api/threads/thread-api.service';
import { ImageApiService } from '../../../api/image/image-api.service';
import { NotificationService } from '../../core/services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-thread-create',
  imports: [ReactiveFormsModule],
  templateUrl: './thread-create.component.html',
  styleUrl: './thread-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadCreateComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private threadApi = inject(ThreadApiService);
  private imageApi = inject(ImageApiService);
  private notify = inject(NotificationService);
  private destroyRef = inject(DestroyRef);

  topicSlug = signal(this.route.snapshot.paramMap.get('slug') ?? '');
  uploading = signal(false);
  submitting = signal(false);
  fileUrl = signal<string | null>(null);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  onFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading.set(true);
    this.imageApi
      .uploadImage(file)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.fileUrl.set(res.url);
          this.notify.success('Imagen subida.');
        },
        error: (err) => this.notify.error(err?.error?.message ?? 'Error al subir imagen.'),
        complete: () => this.uploading.set(false),
      });
  }

  submit() {
    if (this.form.invalid || !this.topicSlug()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    const { title, message } = this.form.value as any;
    this.threadApi
      .createThread({ title, message, topicSlug: this.topicSlug(), file: this.fileUrl() ?? undefined })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (t: any) => {
          this.notify.success('Hilo creado.');
          this.router.navigate(['/thread', t.idThread ?? t.id]);
        },
        error: (err) => {
          const msg = err?.error?.message ?? err?.error ?? 'No se pudo crear el hilo.';
          this.notify.error(msg);
          this.submitting.set(false);
        },
      });
  }
}
