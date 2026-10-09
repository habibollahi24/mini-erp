import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BidiModule } from '@angular/cdk/bidi';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AuthStore } from '../../../store/auth.store';

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
    NzCardModule,
    NzAvatarModule,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.less',
})
export class AdminLayoutComponent {
  authStore = inject(AuthStore);
  isCollapsed = true;
}
