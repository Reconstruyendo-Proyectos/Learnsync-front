import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() padding: string = '';
  @Input() width: string = '';
  @Input() height: string = '';
  @Input() fontSize: string = '';
}
