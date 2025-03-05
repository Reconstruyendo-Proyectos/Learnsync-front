import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PrizeSectionComponent } from '../../sections/profile/prize-section/prize-section.component';
import { FlashcardsSectionComponent } from '../../sections/profile/flashcards-section/flashcards-section.component';
import { UserApiService } from '../../../api/user/user-api.service';
import { UserDTO } from '../../../api/user/interfaces/user-interfaces';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, PrizeSectionComponent, FlashcardsSectionComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  route = inject(ActivatedRoute);
  userApiService = inject(UserApiService);

  user!: UserDTO;

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.userApiService.getAuthenticatedUser().subscribe({
      next: (res: UserDTO) => {
        this.user = res;
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        this.checkProfilePhoto();
      }
    });
  }

  private checkProfilePhoto() {
    if (this.user.profilePhoto === null || !this.user.profilePhoto) {
      this.user.profilePhoto = "https://picsum.photos/64/64?random=15";
    }
  }
}
