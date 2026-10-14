import { Component, input, model, signal } from '@angular/core';
import { TrainDirective } from '../train.directive';

@Component({
  selector: 'app-train',
  imports: [TrainDirective],
  templateUrl: './train.component.html',
  styleUrl: './train.component.scss',
})
export class TrainComponent {
  color = signal('blue');

  manoBegir = 'red';

  data = input<string>('');

  v = input(20);

  constructor() {
    console.log(this.data());
  }
  ngOnInit() {
    console.log(this.data());
  }

  // onColorChanged(color: string) {
  //   this.color.set(color);
  // }
}
