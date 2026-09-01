import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PostListComponent } from '../../../sections/post-list/post-list.component';
import { Thread } from '../../../../api/threads/interfaces/thread-interfaces';
import { ThreadApiService } from '../../../../api/threads/thread-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-popular',
  imports: [PostListComponent],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularComponent implements OnInit {
  threads: Thread[] = [];
  page = 0;
  size = 10;
  private destroyRef = inject(DestroyRef);
  threadApiService = inject(ThreadApiService);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.threadApiService
      .listThreads(this.page, this.size, undefined, 'interactions')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((page) => {
        this.threads = page.content ?? [];
      });
  }
}
