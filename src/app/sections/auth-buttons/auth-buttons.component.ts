import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-buttons',
  imports: [ButtonComponent, RouterModule],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.css'
})
export class AuthButtonsComponent {

}
