import { NgIf } from '@angular/common';
import { Component, HostListener, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthApiService } from '../../../api/auth/auth-api.service';
import { StorageService } from '../../../api/storage/storage.service';

@Component({
  selector: 'app-notification-icon',
  imports: [NgIf, RouterModule],
  templateUrl: './notification-icon.component.html',
  styleUrl: './notification-icon.component.css'
})
export class NotificationIconComponent {

  @Input() image: string = "";

  isDropdownOpen = false;

  authApiService = inject(AuthApiService);
  storageService = inject(StorageService);
  router = inject(Router);

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer?.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }

  logout() {
    this.authApiService.logout();
    this.storageService.clearAuthData();
    this.storageService.clearLoginMethod();
    this.router.navigate(['/login']);
  }
}
