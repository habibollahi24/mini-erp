import { Component, computed, inject, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartStore } from '../../../../store/cart.store';
import { ReviewsService } from '../../services/reviews.service';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { WishlistStore } from '../../../../store/wishlist.store';

@Component({
  selector: 'app-product-detail',
  imports: [
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzRateModule,
    NzInputNumberModule,
    NzDividerModule,
    NzSkeletonModule,
    FormsModule,
    CommonModule,
    NzBreadCrumbModule,
    RouterLink,
    NzTabsModule,
    NzDescriptionsModule,
    NzListModule,
    NzAvatarModule,
    NzCommentModule,
    ProductReviewsComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  readonly cartStore = inject(CartStore);
  readonly wishlistStore = inject(WishlistStore);

  readonly reviewCount = signal(0);
  readonly quantity = signal(1);

  readonly productId = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
  );

  readonly product = rxResource({
    params: () => {
      const id = this.productId();

      return id ? { id } : undefined;
    },
    stream: ({ params }) => this.productsService.getById(params.id),
  });

  increase() {
    this.quantity.update((value) => value + 1);
  }

  decrease() {
    this.quantity.update((value) => Math.max(1, value - 1));
  }

  addToCard(id: number) {
    this.cartStore.addByQyantity(id, this.quantity());
    this.quantity.set(1);
  }
}
