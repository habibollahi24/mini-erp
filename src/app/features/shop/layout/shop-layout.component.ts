import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CartStore } from '../../../core/store/cart/cart.store';
import { NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { CommonModule } from '@angular/common';
import { PersianDigitPipe } from '../../../core/persian-digit-pipe';

@Component({
  selector: 'app-shop-layout',
  imports: [
    RouterOutlet,
    NzIconModule,
    NzBadgeModule,
    NzButtonModule,
    NzDrawerModule,
    CommonModule,
    NzEmptyModule,
    PersianDigitPipe,
  ],
  templateUrl: './shop-layout.component.html',
  styleUrl: './shop-layout.component.scss',
})
export class ShopLayoutComponent {
  readonly store = inject(CartStore);
  visible = false;
  placement: NzDrawerPlacement = 'left';
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  removeFromCart(id: number) {
    this.store.removeFromCart(id);
  }
  decreaseQuantity(id: number) {
    this.store.decreaseQuantity(id);
  }
  increaseQuantity(id: number) {
    this.store.increaseQuantity(id);
  }
  checkout() {}
}
