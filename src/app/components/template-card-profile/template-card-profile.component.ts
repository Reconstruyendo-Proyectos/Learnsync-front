import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-template-card-profile',
  imports: [NgIf],
  templateUrl: './template-card-profile.component.html',
  styleUrl: './template-card-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCardProfileComponent {
  src = input<string>('');
  alt = input<string>('');
  title = input<string>('');
  status = input<string>('');
  radius = input<string>('');
  width = input<string>('80px');
  height = input<string>('');

  isPrize = computed(() => this.status() === 'Canjeado' || this.status() === 'Por Canjear');
  color = computed(() => {
    switch (this.status()) {
      case 'Canjeado': return '#B9B9B9';
      case 'Por Canjear': return '#2dd128';
      default: return '';
    }
  });
}
