import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [ButtonComponent, NgIf]
})
export class ModalComponent {
  @Input() isVisible = false;
  @Input() title = '';
  @Input() message = '';
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}