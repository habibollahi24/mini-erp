import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BidiModule } from '@angular/cdk/bidi';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    BidiModule,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.less',
})
export class AdminLayoutComponent {
  isCollapsed = true;
}
