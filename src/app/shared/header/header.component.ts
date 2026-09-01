import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { NotificationIconComponent } from '../../components/notification-icon/notification-icon.component';
import { SidebarService } from '../../sections/sidebar/service/sidebar.service';
import { RouterModule } from '@angular/router';
import { AuthButtonsComponent } from '../../sections/auth-buttons/auth-buttons.component';
import { UserApiService } from '../../../api/user/user-api.service';
import { UserDTO } from '../../../api/user/interfaces/user-interfaces';
import { StorageService } from '../../../api/storage/storage.service';
import { AuthResponseDTO } from '../../../api/auth/interfaces/auth-interfaces';
import { AuthApiService } from '../../../api/auth/auth-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [SearchBarComponent, NotificationIconComponent, RouterModule, AuthButtonsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  isSidebarOpen = false;
  isSidebarVisible = false;
  isAuthenticated = false;

  username = '';
  user: UserDTO = {
    username: '',
    email: '',
    creationDate: new Date(),
    banDate: new Date(),
    points: 0,
    profilePhoto: '',
    role: {
      roleName: '',
    },
  };

  authResponse: AuthResponseDTO | null = null;

  sidebarService = inject(SidebarService);
  userApiService = inject(UserApiService);
  storageService = inject(StorageService);
  authApiService = inject(AuthApiService);
  private destroyRef = inject(DestroyRef);

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    this.checkSidebar();
    this.checkAuthentication();
    this.authApiService.isAuthenticated$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
      if (isAuth) this.loadData();
    });
    if (this.isAuthenticated) {
      this.loadData();
    }
  }

  private checkAuthentication() {
    if(this.storageService.getAuthData()) {
      this.authApiService.validateLogin();
    }
  }

  private checkSidebar() {
    this.sidebarService.isOpen$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isOpen) => {
      this.isSidebarOpen = isOpen ?? false;
    });

    this.sidebarService.isVisible$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isVisible) => {
      this.isSidebarVisible = isVisible ?? false;
    });
  }

  private checkProfilePhoto() {
    if (this.user.profilePhoto === null || !this.user.profilePhoto) {
      this.user.profilePhoto = "https://picsum.photos/64/64?random=15";
    }
  }

  private loadData() {
    this.userApiService
      .getAuthenticatedUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: UserDTO) => {
          this.user = res;
        },
        error: () => {
          // 401 manejado por errorInterceptor → toast + redirect
        },
        complete: () => {
          this.checkProfilePhoto();
        },
      });
  }
}
