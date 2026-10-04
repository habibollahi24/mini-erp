import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzImageModule } from 'ng-zorro-antd/image';
import { PersianDigitPipe } from '../../../../core/persian-digit-pipe';
import { Product } from '../../shop.model';
import { CartStore } from '../../../../core/store/cart/cart.store';

@Component({
  selector: 'shop-product-card',
  imports: [
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzRateModule,
    NzProgressModule,
    NzImageModule,
    FormsModule,
    CommonModule,
    PersianDigitPipe,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.less',
})
export class ProductCardComponent {
  readonly store = inject(CartStore);
  product = input.required<Product>();
}
