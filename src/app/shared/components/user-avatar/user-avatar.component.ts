import { Component, computed, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  imports: [],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  readonly name = input.required<string | undefined>();
  readonly src = input<string | undefined>();
  readonly size = input<number>(48);

  readonly imageFailed = signal(false);

  constructor() {
    effect(() => {
      this.src();
      this.imageFailed.set(false);
    });
  }

  onImageError(): void {
    this.imageFailed.set(true);
  }
}
// readonly imageFaileds = computed(() => Boolean(this.src()));
