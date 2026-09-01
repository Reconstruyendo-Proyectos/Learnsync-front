import { Injectable, signal, computed } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
}

let nextId = 0;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _toasts = signal<Toast[]>([]);
  toasts = computed(() => this._toasts());

  private push(type: ToastType, message: string, duration: number) {
    const toast: Toast = { id: ++nextId, type, message, duration };
    this._toasts.update((list) => [...list, toast]);
    if (duration > 0) {
      setTimeout(() => this.dismiss(toast.id), duration);
    }
  }

  success(message: string, duration = 3000) {
    this.push('success', message, duration);
  }

  error(message: string, duration = 6000) {
    this.push('error', message, duration);
  }

  warning(message: string, duration = 5000) {
    this.push('warning', message, duration);
  }

  info(message: string, duration = 4000) {
    this.push('info', message, duration);
  }

  dismiss(id: number) {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }

  clear() {
    this._toasts.set([]);
  }
}
