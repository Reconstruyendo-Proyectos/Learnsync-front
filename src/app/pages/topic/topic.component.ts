import { Component, inject, OnInit } from '@angular/core';
import { TopicHeaderComponent } from "../../sections/topic/topic-header/topic-header.component";
import { ActivatedRoute } from '@angular/router';
import { TopicApiService } from '../../../api/topic/topic-api.service';
import { Topic } from '../../../api/topic/interfaces/topic-interfaces';
import { PostListComponent } from "../../sections/post-list/post-list.component";
import { Thread } from '../../../api/threads/interfaces/thread-interfaces';
import { ThreadApiService } from '../../../api/threads/thread-api.service';

@Component({
  selector: 'app-topic',
  imports: [TopicHeaderComponent, PostListComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent implements OnInit{
  topicSlug!: string;
  topic!: Topic;
  threads!: Thread[];
  page: number = 0;

  activatedRouter = inject(ActivatedRoute);
  topicApiService = inject(TopicApiService);
  threadApiService = inject(ThreadApiService);

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
    this.threadApiService.listThreads(this.page, 10, this.topicSlug, 'creation-date').subscribe((threads: Thread[]) => {
      this.threads = threads;
    });
  }
}
