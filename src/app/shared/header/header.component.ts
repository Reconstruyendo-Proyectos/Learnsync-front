import { Component, inject, OnInit } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { NotificationIconComponent } from "../../components/notification-icon/notification-icon.component";
import { SidebarService } from '../../sections/sidebar/service/sidebar.service';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthButtonsComponent } from "../../sections/auth-buttons/auth-buttons.component";
import { UserApiService } from '../../../api/user/user-api.service';
import { UserDTO } from '../../../api/user/interfaces/user-interfaces';
import { StorageService } from '../../../api/storage/storage.service';
import { AuthResponseDTO } from '../../../api/auth/interfaces/auth-interfaces';
import { AuthApiService } from '../../../api/auth/auth-api.service';

@Component({
  selector: 'app-header',
  imports: [SearchBarComponent, NotificationIconComponent, NgIf, RouterModule, AuthButtonsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isSidebarOpen = false;
  isSidebarVisible = false;
  isAuthenticated = false;

  username = "";
  user: UserDTO = {
    username: "",
    email: "",
    creationDate: new Date(),
    banDate: new Date(),
    points: 0,
    profilePhoto: "",
    role: {
      roleName: ""
    }
  };

  authResponse: AuthResponseDTO | null = null;

  sidebarService = inject(SidebarService);
  userApiService = inject(UserApiService);
  storageService = inject(StorageService);
  authApiService = inject(AuthApiService);

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    this.checkSidebar();
    this.checkAuthentication();
    this.authApiService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    if (this.isAuthenticated) {
      this.getUsername();
      this.loadData();
    }
  }

  private checkAuthentication() {
    if(this.storageService.getAuthData()) {
      this.authApiService.validateLogin();
    }
  }

  private checkSidebar() {
    this.sidebarService.isOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen ?? false;
    });

    this.sidebarService.isVisible$.subscribe(isVisible => {
      this.isSidebarVisible = isVisible ?? false;
    });
  }

  private checkProfilePhoto() {
    if (this.user.profilePhoto === null || !this.user.profilePhoto) {
      this.user.profilePhoto = "https://picsum.photos/64/64?random=15";
    }
  }

  private getUsername() {
    this.authResponse = this.storageService.getAuthData();
    this.username = this.authResponse?.user ?? "";
    this.toSlug();
  }

  private toSlug() {
    this.username = this.username.trim().replace(/\s+/g, '-');
  }

  private loadData() {
    this.userApiService.getUser(this.username).subscribe({
      next: (res: UserDTO) => {
        this.user = res;
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        this.checkProfilePhoto();
      }
    });
  }
}
