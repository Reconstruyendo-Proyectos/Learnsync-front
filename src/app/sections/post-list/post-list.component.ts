import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { Thread } from '../../../api/threads/interfaces/thread-interfaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [PostItemComponent, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  threads = input<Thread[]>([]);
  topic = input<string>('');

  getUrl(thread: Thread) {
    return `/thread/${thread.idThread}`;
  }

  trackById(index: number, thread: Thread) {
    return thread.idThread;
  }
}
