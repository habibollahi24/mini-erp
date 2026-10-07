import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { map } from 'rxjs';

@Component({
  selector: 'shop-products-pagination',
  imports: [NzPaginationModule],
  templateUrl: './products-pagination.component.html',
  styleUrl: './products-pagination.component.scss',
})
export class ProductsPaginationComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  totalItems = input.required<number>();
  pageSize = input.required<number>();

  readonly currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => Number(params.get('page') ?? 1)),
    ),
    { initialValue: 1 },
  );

  onPageChange(page: number): void {
    this.router.navigate([], {
      queryParams: {
        page,
      },
      queryParamsHandling: 'merge',
    });
  }
}
