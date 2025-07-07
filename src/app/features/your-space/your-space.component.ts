import { Component, signal } from '@angular/core';
import { UpdatePersonalInfoComponent } from '../update-personal-info/update-personal-info.component';

@Component({
  selector: 'app-your-space',
  standalone: true,
  imports: [UpdatePersonalInfoComponent],
  templateUrl: './your-space.component.html',
  styleUrl: './your-space.component.scss'
})
export class YourSpaceComponent {

  selectedAction = signal<string | null>(null);

  handleActionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedAction.set(value);
  }


}
