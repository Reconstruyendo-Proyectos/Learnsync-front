import { Component, Input, OnInit } from '@angular/core';
import { Thread } from '../../../api/threads/interfaces/thread-interfaces';
import { Temporal } from 'temporal-polyfill';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post-item',
  imports: [NgIf],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css'
})
export class PostItemComponent implements OnInit {
  @Input() thread!: Thread;
  @Input() topic: string = "";
  publicationDate: string = "";

  ngOnInit(): void {
    this.checkImage();
    this.formatDate();
  }

  private checkImage() {
    if(this.thread.user.profilePhoto === null || this.thread.user.profilePhoto === undefined) {
      this.thread.user.profilePhoto = "images/photo-profile-generic.webp";
    }
  }

  private formatDate() {
    const start = Temporal.PlainDateTime.from(this.thread.creationDate.toString());
    const end = Temporal.Now.plainDateTimeISO();
    const diff = end.since(start);
    if(diff.years > 0) {
      if(diff.years === 1) {
        this.publicationDate = `hace ${diff.years} año`;
      } else {
        this.publicationDate = `hace ${diff.years} años`;
      }
    } else if(diff.months > 0) {
      if(diff.months === 1) {
        this.publicationDate = `hace ${diff.months} mes`;
      } else {
        this.publicationDate = `hace ${diff.months} meses`;
      }
    } else if(diff.weeks > 0) {
      if(diff.weeks === 1) {
        this.publicationDate = `hace ${diff.weeks} semana`;
      } else {
        this.publicationDate = `hace ${diff.weeks} semanas`;
      }
    } else if(diff.days > 0) {
      if(diff.days === 1) {
        this.publicationDate = `hace ${diff.days} día`;
      } else {
        this.publicationDate = `hace ${diff.days} días`;
      }
    } else if(diff.hours > 0) {
      if(diff.hours === 1) {
        this.publicationDate = `hace ${diff.hours} hora`;
      } else {
        this.publicationDate = `hace ${diff.hours} horas`;
      }
    } else if(diff.minutes > 0) {
      if(diff.minutes === 1) {
        this.publicationDate = `hace ${diff.minutes} minuto`;
      } else {
        this.publicationDate = `hace ${diff.minutes} minutos`;
      }
    } else {
      this.publicationDate = `${diff.seconds} segundos`;
    }
  }

  onLike(): void {
    console.log("Le di like");
  }

  onStar(): void {
    console.log("Le di estrellas");
  }

  onComments(): void {
    console.log(`Viendo comentarios del post`);
    // Lógica para navegar a la página de comentarios
  }

  getMediaType(): string {
    if (this.thread.file.match(/\.(jpeg|jpg|png|gif)$/i)) {
      return 'image'; // Es una imagen
    } else if (this.thread.file.match(/\.(mp4|mov|avi)$/i)) {
      return 'direct-video'; // Es un video directo
    } else {
      return 'unknown'; // Tipo desconocido
    }
  }
}
