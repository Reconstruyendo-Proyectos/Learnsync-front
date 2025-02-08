import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  private isVisibleSubject = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isVisibleSubject.asObservable();

  private excludedRoutes = ['/login', '/register', '/forgot'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const shouldShowSidebar = !this.excludedRoutes.some(route => event.url.includes(route));
      this.isVisibleSubject.next(shouldShowSidebar);

      if (!shouldShowSidebar) {
        this.closeSidebar();
      }
    });
  }

  toggleSidebar(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  closeSidebar(): void {
    this.isOpenSubject.next(false);
  }

  openSidebar(): void {
    this.isOpenSubject.next(true);
  }

  isSidebarVisible(): boolean {
    return this.isVisibleSubject.value;
  }
}