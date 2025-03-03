import { Component, inject, OnInit } from '@angular/core';
import { PostListComponent } from "../../../sections/post-list/post-list.component";
import { Thread } from '../../../../api/threads/interfaces/thread-interfaces';
import { ThreadApiService } from '../../../../api/threads/thread-api.service';

@Component({
  selector: 'app-home',
  imports: [PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  threads!: Thread[];
  page: number = 0;
  
  threadApiService = inject(ThreadApiService);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.threadApiService.listThreads(this.page).subscribe((threads: Thread[]) => {
      this.threads = threads;
    });
  }
}
