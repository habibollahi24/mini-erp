import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ReviewsService } from '../../services/reviews.service';
import { Product } from '../../shop.model';

@Component({
  selector: 'shop-product-reviews',

  imports: [
    NzCardModule,
    NzRateModule,
    NzAvatarModule,
    NzCommentModule,
    FormsModule,
    NzSkeletonModule,
    NzTypographyModule,
  ],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss',
})
export class ProductReviewsComponent {
  private readonly reviewsService = inject(ReviewsService);

  readonly product = input.required<Product | undefined>();

  readonly reviews = rxResource({
    params: () => {
      const product = this.product();

      return product ? { productId: product.id } : undefined;
    },

    stream: ({ params }) =>
      this.reviewsService.getReviewsWithCustomers(params.productId),
  });
}
