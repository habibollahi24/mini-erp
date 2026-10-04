import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NzRadioModule } from 'ng-zorro-antd/radio';

import { map } from 'rxjs';

@Component({
  selector: 'shop-sort-filter',
  imports: [FormsModule, NzRadioModule],
  templateUrl: './sort-filter.component.html',
  styleUrl: './sort-filter.component.scss',
})
export class SortFilterComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly sort = signal<string | null>(null);

  readonly options = [
    {
      label: 'جدیدترین',
      value: 'createdAt-desc',
    },
    {
      label: 'ارزان‌ترین',
      value: 'price-asc',
    },
    {
      label: 'گران‌ترین',
      value: 'price-desc',
    },
    {
      label: 'محبوب‌ترین',
      value: 'salesCount-desc',
    },
  ];

  constructor() {
    this.route.queryParamMap
      .pipe(
        map((params) => params.get('sort')),
        takeUntilDestroyed(),
      )
      .subscribe((value) => {
        this.sort.set(value);
      });
  }

  onSortChange(value: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
