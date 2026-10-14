import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { BrandsService } from '../../services/brands.service';
import { Brand } from '../../shop.model';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { Subject } from 'rxjs';

@Component({
  selector: 'shop-brand-filter',
  imports: [NzSelectModule, FormsModule, NzRadioModule],
  templateUrl: './brand-filter.component.html',
  styleUrl: './brand-filter.component.scss',
})
export class BrandFilterComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly brandService = inject(BrandsService);

  readonly isSelectedCategory = signal(false);

  readonly brands = signal<Brand[]>([]);
  readonly selectedBrand = signal<string | null>(null);

  selectedCategorySubject = new Subject<boolean>();

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const categoryId = params.get('categoryId');
      const brand = params.get('brand');

      if (!categoryId) {
        this.isSelectedCategory.set(false);
        return;
      }

      this.selectedBrand.set(brand);
      this.isSelectedCategory.set(true);
      this.loadBrands(categoryId ? Number(categoryId) : undefined);
    });
  }

  private loadBrands(categoryId?: number): void {
    this.brandService.getBrands(categoryId).subscribe((brands) => {
      this.brands.set(brands);
    });
  }

  onBrandChange(brand: string | null): void {
    this.router.navigate([], {
      queryParams: {
        brand,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
