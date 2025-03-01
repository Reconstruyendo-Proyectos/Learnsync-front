import { Component } from '@angular/core';
import { PostItemComponent } from "../../components/post-item/post-item.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [PostItemComponent, NgFor],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  posts = [
    {
      profilePicture: 'https://picsum.photos/64/64?random=12',
      author: 'jluyo',
      timeAgo: 'Hace 3 días',
      topic: 'Actividad Formativa I',
      title: '¿La reconstrucción de Learnsync es real?',
      content: 'Me dará tiempo a acabar Learnsync antes de que acaben las vacaciones? Porque tengo que hacer mi portafolio aún.',
      image: 'https://picsum.photos/1200/600?random=12',
      likes: 2500,
      stars: 4500,
      comments: 250
    },
    {
      profilePicture: 'https://via.placeholder.com/30',
      author: 'devMaster',
      timeAgo: 'Hace 5 horas',
      topic: 'Angular',
      title: 'Angular vs React: ¿Cuál es mejor para proyectos grandes?',
      content: 'Estoy pensando en aprender Angular o React. ¿Qué opinan?',
      likes: 1200,
      stars: 3000,
      comments: 150
    }
  ];
}
