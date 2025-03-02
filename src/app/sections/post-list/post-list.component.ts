import { Component, Input, OnInit } from '@angular/core';
import { PostItemComponent } from "../../components/post-item/post-item.component";
import { NgFor } from '@angular/common';
import { Thread } from '../../../api/threads/interfaces/thread-interfaces';

@Component({
  selector: 'app-post-list',
  imports: [PostItemComponent, NgFor],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  @Input() threads: Thread[] = [];
  @Input() topic: string = "";
}
