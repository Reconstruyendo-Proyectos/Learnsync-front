import { Component, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  notificationService = inject(NotificationService);
}
