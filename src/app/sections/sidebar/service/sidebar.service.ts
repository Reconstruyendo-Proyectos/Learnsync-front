import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  toggleSidebar(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  closeSidebar(): void {
    this.isOpenSubject.next(false);
  }

  openSidebar(): void {
    this.isOpenSubject.next(true);
  }
}
