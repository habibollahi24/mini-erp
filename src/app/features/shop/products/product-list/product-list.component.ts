import { Component, inject, signal } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { map, switchMap, tap } from 'rxjs';
import { mapParamsToProductQuery } from '../../utils/product-query.mapper';
import { Product } from '../../shop.model';
import { ProductsPaginationComponent } from '../products-pagination/products-pagination.component';

@Component({
  selector: 'shop-product-list',
  imports: [
    NzSpinModule,
    NzEmptyModule,
    NzResultModule,
    ProductCardComponent,
    NzGridModule,
    ProductsPaginationComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductsService);

  readonly error = signal(false);
  readonly products = signal<Product[]>([]);
  readonly productsLoading = signal(false);
  readonly totalItems = signal(0);
  readonly pageSize = 6;

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((params) => {
          return mapParamsToProductQuery(params, this.pageSize);
        }),

        tap((params) => {
          console.log('ggggggggggg', params);
          this.productsLoading.set(true);
          this.error.set(false);
        }),

        switchMap((query) => this.productService.getProducts(query)),
      )
      .subscribe({
        next: (response) => {
          this.products.set(response.body ?? []);

          const total = response.headers.get('X-Total-Count');

          this.totalItems.set(total ? Number(total) : 0);

          this.productsLoading.set(false);
          this.error.set(false);
        },

        error: () => {
          this.productsLoading.set(false);
          this.error.set(true);
        },
      });
  }
  retry() {}
}
