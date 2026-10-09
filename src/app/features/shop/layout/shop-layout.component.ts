import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CartStore } from '../../../store/cart.store';
import { NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { CommonModule } from '@angular/common';
import { PersianDigitPipe } from '../../../core/persian-digit-pipe';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { WishlistStore } from '../../../store/wishlist.store';
import { AuthStore } from '../../../store/auth.store';

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
    NzCardModule,
    NzAvatarModule,
    RouterLink,
    NzTooltipModule,
  ],
  templateUrl: './shop-layout.component.html',
  styleUrl: './shop-layout.component.scss',
})
export class ShopLayoutComponent {
  readonly cartStore = inject(CartStore);
  readonly authStore = inject(AuthStore);
  readonly wishlistStore = inject(WishlistStore);

  constructor() {
    effect(() => {
      console.log(this.wishlistStore.favariteProducts());
    });
  }

  visible = false;
  placement: NzDrawerPlacement = 'left';
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  removeFromCart(id: number) {
    this.cartStore.removeFromCart(id);
  }
  decreaseQuantity(id: number) {
    this.cartStore.decreaseQuantity(id);
  }
  increaseQuantity(id: number) {
    this.cartStore.increaseQuantity(id);
  }
  checkout() {}

  logout() {
    this.authStore.logout();
  }
}
