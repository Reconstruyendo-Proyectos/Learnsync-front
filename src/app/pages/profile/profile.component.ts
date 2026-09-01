import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PrizeSectionComponent } from '../../sections/profile/prize-section/prize-section.component';
import { FlashcardsSectionComponent } from '../../sections/profile/flashcards-section/flashcards-section.component';
import { UserApiService } from '../../../api/user/user-api.service';
import { UserDTO } from '../../../api/user/interfaces/user-interfaces';
import { ImageApiService } from '../../../api/image/image-api.service';
import { NotificationService } from '../../core/services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, PrizeSectionComponent, FlashcardsSectionComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  route = inject(ActivatedRoute);
  userApiService = inject(UserApiService);
  imageApi = inject(ImageApiService);
  notify = inject(NotificationService);
  private destroyRef = inject(DestroyRef);

  user!: UserDTO;

  ngOnInit() {
    this.loadData();
  }

  onPhoto(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.imageApi.uploadImage(file).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.userApiService.updatePhoto(res.url).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (u) => { this.user = u; this.checkProfilePhoto(); this.notify.success('Foto actualizada.'); },
          error: (err) => this.notify.error(err?.error?.message ?? 'No se pudo guardar foto.'),
        });
      },
      error: (err) => this.notify.error(err?.error?.message ?? 'Error al subir imagen.'),
    });
  }

  removePhoto() {
    this.userApiService.deletePhoto().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.user.profilePhoto = 'https://picsum.photos/64/64?random=15'; this.notify.success('Foto eliminada.'); },
      error: (err) => this.notify.error(err?.error?.message ?? 'No se pudo eliminar.'),
    });
  }

  private loadData() {
    this.userApiService.getAuthenticatedUser().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: UserDTO) => { this.user = res; },
      error: () => this.notify.error('No se pudo cargar perfil.'),
      complete: () => this.checkProfilePhoto(),
    });
  }

  private checkProfilePhoto() {
    if (!this.user?.profilePhoto) {
      this.user.profilePhoto = 'https://picsum.photos/64/64?random=15';
    }
  }
}
