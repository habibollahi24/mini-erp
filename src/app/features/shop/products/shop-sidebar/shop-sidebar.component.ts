import { Component, inject } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { BrandFilterComponent } from '../brand-filter/brand-filter.component';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceFilterComponent } from '../price-filter/price-filter.component';
import { SortFilterComponent } from '../sort-filter/sort-filter.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'shop-shop-sidebar',
  imports: [
    NzCollapseModule,
    BrandFilterComponent,
    CategoryFilterComponent,
    PriceFilterComponent,
    SortFilterComponent,
    NzDividerModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './shop-sidebar.component.html',
  styleUrl: './shop-sidebar.component.scss',
})
export class ShopSidebarComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  onResetFilters(): void {
    this.router.navigate([], {
      queryParams: {
        categoryId: null,
        brand: null,
        search: null,
        sort: null,
        minPrice: null,
        maxPrice: null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
