import {
  Component,
  effect,
  ElementRef,
  input,
  model,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { TrainDirective } from '../train.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-train',
  imports: [TrainDirective, NgTemplateOutlet],
  templateUrl: './train.component.html',
  styleUrl: './train.component.scss',
})
export class TrainComponent {
  color = signal('blue');

  readonly nameTemplate = viewChild.required('name', {
    read: TemplateRef<any>,
  });
  readonly containerNameTemplate = viewChild('container', {
    read: ViewContainerRef,
  });

  onClik() {
    this.containerNameTemplate()?.clear();
    this.containerNameTemplate()?.createEmbeddedView(this.nameTemplate());
  }

  constructor() {
    effect(() => {
      console.log(this.nameTemplate());
      console.log(this.containerNameTemplate());
    });
  }

  manoBegir = 'red';

  data = input<string>('');

  v = input(20);

  ngOnInit() {
    console.log(this.data());
  }

  // onColorChanged(color: string) {
  //   this.color.set(color);
  // }
}
