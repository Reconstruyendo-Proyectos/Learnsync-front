import { Component, Input } from '@angular/core';
import { HoverStyleDirective } from '../../directives/hover-style.directive';

@Component({
  selector: 'app-button',
  imports: [HoverStyleDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() padding: string = '';
  @Input() width: string = '';
  @Input() height: string = '';
  @Input() fontSize: string = '';
  @Input() radius: string = '15px';
  @Input() color: string = '#2889c5';
  @Input() hoverColor: string = '';
}
