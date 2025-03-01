import { Component, inject, OnInit } from '@angular/core';
import { TopicHeaderComponent } from "../../sections/topic/topic-header/topic-header.component";
import { ActivatedRoute } from '@angular/router';
import { TopicApiService } from '../../../api/topic/topic-api.service';
import { Topic } from '../../../api/topic/interfaces/topic-interfaces';
import { PostListComponent } from "../../sections/post-list/post-list.component";

@Component({
  selector: 'app-topic',
  imports: [TopicHeaderComponent, PostListComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent implements OnInit{
  topicSlug!: string;
  topic!: Topic;

  activatedRouter = inject(ActivatedRoute);
  topicApiService = inject(TopicApiService);

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.topicSlug = params['slug'];
    });
    this.loadData();
  }

  private loadData() {
    this.topicApiService.getTopic(this.topicSlug).subscribe((topic: Topic) => {
      this.topic = topic;
    });
  }
}
