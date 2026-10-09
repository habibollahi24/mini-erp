import { Component, inject } from '@angular/core';
import { WishlistStore } from '../../../../store/wishlist.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'shop-profile-wishlist',
  imports: [
    NzIconModule,
    NzEmptyModule,
    NzListModule,
    NzAvatarModule,
    RouterLink,
    NzCardModule,
    NzButtonModule,
  ],
  templateUrl: './profile-wishlist.component.html',
  styleUrl: './profile-wishlist.component.scss',
})
export class ProfileWishlistComponent {
  readonly wishlistStore = inject(WishlistStore);
}
