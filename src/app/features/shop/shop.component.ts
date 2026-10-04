import { Component, effect, inject } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

import { SearchBoxComponent } from './products/search-box/search-box.component';
import { ShopSidebarComponent } from './products/shop-sidebar/shop-sidebar.component';
import { ProductListComponent } from './products/product-list/product-list.component';

@Component({
  selector: 'app-shop',
  imports: [
    NzGridModule,
    CommonModule,
    SearchBoxComponent,
    ShopSidebarComponent,
    ProductListComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {}
