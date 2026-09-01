import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TopicHeaderComponent } from '../../sections/topic/topic-header/topic-header.component';
import { ActivatedRoute } from '@angular/router';
import { TopicApiService } from '../../../api/topic/topic-api.service';
import { Topic } from '../../../api/topic/interfaces/topic-interfaces';
import { PostListComponent } from '../../sections/post-list/post-list.component';
import { Thread } from '../../../api/threads/interfaces/thread-interfaces';
import { ThreadApiService } from '../../../api/threads/thread-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-topic',
  imports: [TopicHeaderComponent, PostListComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicComponent implements OnInit {
  topicSlug!: string;
  topic!: Topic;
  threads: Thread[] = [];
  page = 0;
  size = 10;
  private destroyRef = inject(DestroyRef);
  activatedRouter = inject(ActivatedRoute);
  topicApiService = inject(TopicApiService);
  threadApiService = inject(ThreadApiService);

  ngOnInit(): void {
    this.activatedRouter.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.topicSlug = params['slug'];
      this.loadData();
    });
  }

  private loadData() {
    this.topicApiService
      .getTopic(this.topicSlug)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((topic: Topic) => {
        this.topic = topic;
      });
    this.threadApiService
      .listThreads(this.page, this.size, this.topicSlug, 'creation-date')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((threads: Thread[]) => {
        this.threads = threads;
      });
  }
}
