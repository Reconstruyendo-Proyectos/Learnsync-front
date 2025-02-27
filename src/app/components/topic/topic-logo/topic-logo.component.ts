import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topic-logo',
  imports: [],
  templateUrl: './topic-logo.component.html',
  styleUrl: './topic-logo.component.css'
})
export class TopicLogoComponent {
  @Input() logoUrl!: string;
  @Input() topicName!: string;
}
