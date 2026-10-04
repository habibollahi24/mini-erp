import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'shop-price-filter',
  imports: [
    FormsModule,
    NzInputNumberModule,
    NzButtonModule,
    NzSliderModule,
    NzIconModule,
  ],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.scss',
})
export class PriceFilterComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly range = signal<(number | null)[]>([null, null]);

  readonly minRange = computed(() => this.range()[0]);
  readonly maxRange = computed(() => this.range()[1]);

  constructor() {
    effect(() => {
      console.log(this.range(), this.minRange(), this.maxRange());
    });
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const min = params.get('minPrice');
      const max = params.get('maxPrice');

      // this.minPrice.set(min ? Number(min) : null);

      this.range.update((prev) => [min ? Number(min) : null, prev[1]]);
      this.range.update((prev) => [prev[0], max ? Number(max) : null]);

      // this.maxPrice.set(max ? Number(max) : null);
    });
  }

  apply(): void {
    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        // minPrice: this.minPrice(),
        // maxPrice: this.maxPrice(),
        minPrice: this.minRange(),
        maxPrice: this.maxRange(),
        page: 1,
      },

      queryParamsHandling: 'merge',
    });
  }

  reset(): void {
    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        minPrice: null,
        maxPrice: null,
        page: 1,
      },

      queryParamsHandling: 'merge',
    });
  }

  priceToPersian(value: number) {
    return new Intl.NumberFormat('fa-IR').format(value);
  }
}
