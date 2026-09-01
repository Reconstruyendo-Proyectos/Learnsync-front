import { Component, ChangeDetectionStrategy, DestroyRef, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './sections/sidebar/sidebar.component';
import { SidebarService } from './sections/sidebar/service/sidebar.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './shared/toast/toast.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'learnsync';
  isSidebarOpen = false;
  isAuthRoute = false;
  sidebarService = inject(SidebarService);
  router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.sidebarService.isOpen$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isOpen) => {
      this.isSidebarOpen = isOpen ?? false;
    });

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const currentRoute = this.router.url;
        this.isAuthRoute = ['/login', '/register', '/forgot-password'].includes(currentRoute);
      });
  }
}
