import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-topics',
  imports: [ButtonComponent, RouterModule],
  templateUrl: './card-topics.component.html',
  styleUrl: './card-topics.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTopicsComponent {
  srcImage = input<string>('');
  title = input<string>('');
  nroComments = input<string>('');
  description = input<string>('');
  slug = input<string>('');

  uri = computed(() => `/topic/${this.slug()}`);
}
