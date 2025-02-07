import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-card-topics',
  imports: [ButtonComponent],
  templateUrl: './card-topics.component.html',
  styleUrl: './card-topics.component.css'
})
export class CardTopicsComponent {
  @Input() srcImage: string = '';
  @Input() title: string = '';
  @Input() nroComments: string = '';
  @Input() description: string = '';
}
