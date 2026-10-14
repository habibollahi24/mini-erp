import {
  computed,
  Directive,
  effect,
  input,
  linkedSignal,
  model,
  output,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appTrain]',
  host: {
    '(click)': 'changeName()',
    '[style.cursor]': '"pointer"',
    '[style.color]': 'isActive() && color()',
  },
  exportAs: 'td',
})
export class TrainDirective {
  color = model.required<string>();

  dColor = 'yellow';

  isActive = signal(false);
  // greenColor = signal<string>('green');
  // name1 = signal<string>('ali');
  // name2 = signal<string>('habibi');

  // colorChanged = output<string>();

  constructor() {
    effect(() => {
      // console.log(this.chom());
    });
  }

  // sumComputed = computed(() => this.name1() + this.name2());

  // colorInputlinked = linkedSignal(this.color);

  changeName() {
    this.color.set('red');
    // this.colorChanged.emit('red');
    // this.name1.set('mohammad');
    // this.greenColor.set('yellow');
    // this.colorInputlinked.set('red');
    // console.log('clicked');
  }

  // onClick() {
  //   // this.link.set(2);
  // }
}

// <p>computed {{ sumComputed() }}</p>
// <p>linked {{ sumlinked() }}</p>
// <p>input {{ chom() }}</p>

// <button (click)="changeName()">change name</button>
