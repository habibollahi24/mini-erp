import { Component, effect, inject } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

import { SearchBoxComponent } from './products/search-box/search-box.component';
import { ShopSidebarComponent } from './products/shop-sidebar/shop-sidebar.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [
    NzGridModule,
    CommonModule,
    SearchBoxComponent,
    ShopSidebarComponent,
    ProductListComponent,
    NzButtonModule,
    NzDrawerModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  readonly route = inject(ActivatedRoute);
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
