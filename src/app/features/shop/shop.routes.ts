import { Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';

export const SHOP_ROUTES: Routes = [
  { path: '', component: ShopComponent },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
