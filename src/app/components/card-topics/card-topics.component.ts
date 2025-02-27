import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-topics',
  imports: [ButtonComponent, RouterModule],
  templateUrl: './card-topics.component.html',
  styleUrl: './card-topics.component.css'
})
export class CardTopicsComponent implements OnInit{
  @Input() srcImage: string = '';
  @Input() title: string = '';
  @Input() nroComments: string = '';
  @Input() description: string = '';
  @Input() slug: string = '';

  uri: string = '';

  ngOnInit(): void {
      this.uri = `/topic/${this.slug}`;
  }
}
