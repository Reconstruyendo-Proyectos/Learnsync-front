import { Component, Input, OnInit } from '@angular/core';
import { PostItemComponent } from "../../components/post-item/post-item.component";
import { NgFor } from '@angular/common';
import { Thread } from '../../../api/threads/interfaces/thread-interfaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [PostItemComponent, NgFor, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  @Input() threads: Thread[] = [];
  @Input() topic: string = "";

  getUrl(thread: Thread) {
    return `/thread/${thread.idThread}`;
  }
}
