import { Component } from '@angular/core';
import { CountUpComponent } from '../../shared/components/count-up/count-up.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountUpComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
