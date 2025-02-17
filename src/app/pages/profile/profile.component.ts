import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PrizeSectionComponent } from '../../sections/prize-section/prize-section.component';
import { FlashcardsSectionComponent } from '../../sections/flashcards-section/flashcards-section.component';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, PrizeSectionComponent, FlashcardsSectionComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  route = inject(ActivatedRoute);
  username = '';

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.username = params['username'];
      })
      console.log(`El usuario es ${this.username}`);
  }
}
