import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topic-banner',
  imports: [],
  templateUrl: './topic-banner.component.html',
  styleUrl: './topic-banner.component.css'
})
export class TopicBannerComponent {
  @Input() bannerUrl!: string;
}