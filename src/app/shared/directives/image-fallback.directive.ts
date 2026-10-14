import {
  Directive,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal,
} from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  host: {
    '(error)': 'onImageError()',
  },
})
export class ImageFallbackDirective {
  private readonly el = inject(ElementRef<HTMLImageElement>);
  private readonly renderer = inject(Renderer2);

  readonly appImageFallback = input.required<string>(); //  /public/placeholder

  private readonly hasError = signal(false);

  onImageError(): void {
    const img = this.el.nativeElement;

    if (this.hasError()) {
      return;
    }

    this.hasError.set(true);

    this.renderer.setProperty(img, 'src', this.appImageFallback());
  }
}
