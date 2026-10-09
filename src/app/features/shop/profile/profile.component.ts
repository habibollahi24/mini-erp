import { Component, inject } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { AuthStore } from '../../../store/auth.store';
import { ProfileWishlistComponent } from './profile-wishlist/profile-wishlist.component';

@Component({
  selector: 'app-profile',
  imports: [
    NzAvatarModule,
    NzCardModule,
    NzDescriptionsModule,
    NzButtonModule,
    NzDividerModule,
    NzTagModule,
    NzIconModule,
    NzBreadCrumbModule,
    RouterLink,
    NzTabsModule,
    ProfileInfoComponent,
    ProfileOrdersComponent,
    ProfileWishlistComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly authStore = inject(AuthStore);
  readonly user = this.authStore.user;
}
