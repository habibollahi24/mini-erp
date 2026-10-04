import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianDigit',
})
export class PersianDigitPipe implements PipeTransform {
  private formatter = new Intl.NumberFormat('fa-IR');

  transform(value: number | null | undefined): string {
    if (value == null) {
      return '';
    }

    return this.formatter.format(value);
  }
}
