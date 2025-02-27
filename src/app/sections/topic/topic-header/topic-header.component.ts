import { Component, Input } from '@angular/core';
import { TopicBannerComponent } from '../../../components/topic/topic-banner/topic-banner.component';
import { TopicLogoComponent } from '../../../components/topic/topic-logo/topic-logo.component';
import { ButtonComponent } from "../../../components/button/button.component";

@Component({
  selector: 'app-topic-header',
  imports: [TopicBannerComponent, TopicLogoComponent, ButtonComponent],
  templateUrl: './topic-header.component.html',
  styleUrl: './topic-header.component.css'
})
export class TopicHeaderComponent {
  @Input() bannerUrl!: string;
  @Input() logoUrl!: string;
  @Input() topicName!: string;
}
