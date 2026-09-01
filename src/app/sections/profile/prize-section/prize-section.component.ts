import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PrizeApiService, Prize } from '../../../../api/prize/prize-api.service';
import { UserApiService } from '../../../../api/user/user-api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-prize-section',
  imports: [NgFor, NgIf],
  templateUrl: './prize-section.component.html',
  styleUrl: './prize-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrizeSectionComponent implements OnInit {
  prizes = signal<Prize[]>([]);
  userPoints = signal<number>(0);
  loading = signal(true);

  private prizeApi = inject(PrizeApiService);
  private userApi = inject(UserApiService);
  private notify = inject(NotificationService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.userApi
      .getAuthenticatedUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((u) => this.userPoints.set(u.points ?? 0));

    this.prizeApi
      .getPrizes(0, 10)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          const list: Prize[] = res.content ?? res ?? [];
          this.prizes.set(list);
        },
        error: () => this.notify.warning('No se pudieron cargar los premios.'),
        complete: () => this.loading.set(false),
      });
  }

  canRedeem(prize: Prize): boolean {
    return this.userPoints() >= prize.price;
  }

  exchange(prize: Prize): void {
    if (!this.canRedeem(prize)) {
      this.notify.warning('Puntos insuficientes para canjear este premio.');
      return;
    }
    this.prizeApi
      .exchangePrize(prize.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notify.success(`¡Canjeado: ${prize.name}!`);
          this.userPoints.update((p) => p - prize.price);
        },
        error: (err) => {
          const msg = err?.error?.message ?? err?.error ?? '';
          if (msg.toLowerCase().includes('puntos insuficientes')) {
            this.notify.warning('Puntos insuficientes.');
          } else if (msg.toLowerCase().includes('ya canjeado') || err.status === 409) {
            this.notify.warning('Ya canjeaste este premio.');
          } else {
            this.notify.error(msg || 'No se pudo canjear.');
          }
        },
      });
  }
}
