import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../shop.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'shop-category-filter',
  imports: [NzRadioModule, FormsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly categoryService = inject(CategoryService);
  readonly categories = signal<Category[]>([]);
  readonly categoriesLoading = signal(false);

  readonly categorySelected = signal<number | null>(null);

  constructor() {
    this.route.queryParamMap
      .pipe(
        map((params) => Number(params.get('categoryId')) ?? null),
        takeUntilDestroyed(),
      )
      .subscribe((value) => {
        console.log('vvvvvvv', value);
        this.categorySelected.set(value);
      });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoriesLoading.set(true);

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.categoriesLoading.set(false);
      },

      error: () => {
        this.categoriesLoading.set(false);
      },
    });
  }

  onCategoryFilter(categoryId: number | null): void {
    // this.selecterCategoryFilter.set(categoryId);
    // this.currentPage.set(1);
    // this.loadProducts();
    this.router.navigate([], {
      queryParams: {
        categoryId: categoryId,
        brand: null,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
