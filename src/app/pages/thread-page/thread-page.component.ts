import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadApiService } from '../../../api/threads/thread-api.service';
import { Thread } from '../../../api/threads/interfaces/thread-interfaces';
import { CommentApiService } from '../../../api/comment/comment-api.service';
import { Comment } from '../../../api/comment/interfaces/comments-interface';
import { NotificationService } from '../../core/services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Temporal } from 'temporal-polyfill';

@Component({
  selector: 'app-thread-page',
  imports: [FormsModule],
  templateUrl: './thread-page.component.html',
  styleUrl: './thread-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadPageComponent implements OnInit {
  thread = signal<Thread | null>(null);
  comments = signal<Comment[]>([]);
  newMessage = signal('');
  loading = signal(true);

  private route = inject(ActivatedRoute);
  private threadApi = inject(ThreadApiService);
  private commentApi = inject(CommentApiService);
  private notify = inject(NotificationService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.threadApi
      .getThread(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (t) => this.thread.set(t),
        error: () => this.notify.warning('Hilo no encontrado.'),
        complete: () => this.loading.set(false),
      });

    this.commentApi
      .getCommentsByThread(id, 0, 10)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: { content?: Comment[] } | Comment[]) => this.comments.set((res as { content: Comment[] }).content ?? (res as Comment[]) ?? []),
        error: () => this.notify.warning('No se pudieron cargar comentarios.'),
      });
  }

  formatDate(date: Date | string): string {
    try {
      const start = Temporal.PlainDateTime.from(new Date(date).toISOString().slice(0, 19));
      const end = Temporal.Now.plainDateTimeISO();
      const diff = end.since(start);
      if (diff.years > 0) return `hace ${diff.years} ${diff.years === 1 ? 'año' : 'años'}`;
      if (diff.months > 0) return `hace ${diff.months} ${diff.months === 1 ? 'mes' : 'meses'}`;
      if (diff.weeks > 0) return `hace ${diff.weeks} ${diff.weeks === 1 ? 'semana' : 'semanas'}`;
      if (diff.days > 0) return `hace ${diff.days} ${diff.days === 1 ? 'día' : 'días'}`;
      if (diff.hours > 0) return `hace ${diff.hours} ${diff.hours === 1 ? 'hora' : 'horas'}`;
      if (diff.minutes > 0) return `hace ${diff.minutes} ${diff.minutes === 1 ? 'minuto' : 'minutos'}`;
      return `${diff.seconds} segundos`;
    } catch {
      return '';
    }
  }

  submitComment(): void {
    const msg = this.newMessage().trim();
    const t = this.thread();
    if (!msg || !t) return;
    this.commentApi
      .createComment(t.idThread, msg)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (c) => {
          this.comments.update((list) => [c, ...list]);
          this.newMessage.set('');
          this.notify.success('Comentario publicado.');
        },
        error: (err: { error?: { message?: string } | string }) => this.notify.error((err?.error as { message?: string })?.message ?? (err?.error as string) ?? 'No se pudo comentar.'),
      });
  }

  trackByComment(_: number, c: Comment) { return c.idComment; }
}
