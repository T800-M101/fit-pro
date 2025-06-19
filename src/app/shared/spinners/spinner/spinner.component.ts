import { Component, effect, input } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  isLoading = input<boolean>(false);

  constructor(private spinner: NgxSpinnerService){
    effect(() => {
      if (this.isLoading()) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

 
  
}
