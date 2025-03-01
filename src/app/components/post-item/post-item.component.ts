import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-item',
  imports: [NgIf],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css'
})
export class PostItemComponent {
  @Input() post!: {
    profilePicture: string; // URL de la foto de perfil
    author: string; // Nombre del autor
    timeAgo: string; // Tiempo transcurrido
    topic: string; // Tópico
    title: string; // Título del post
    content: string; // Contenido del post
    image?: string; // URL de la imagen (opcional)
    likes: number; // Número de likes
    stars: number; // Número de estrellas
    comments: number; // Número de comentarios
  };

  onLike(): void {
    this.post.likes++;
  }

  onStar(): void {
    this.post.stars++;
  }

  onComments(): void {
    console.log(`Viendo comentarios del post`);
    // Lógica para navegar a la página de comentarios
  }
}
