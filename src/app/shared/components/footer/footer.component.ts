import { Component } from '@angular/core';
import { SocialComponent } from "../social/social.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

}
