import { Component, inject } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AuthStore } from '../../../../store/auth.store';

@Component({
  selector: 'shop-profile-info',
  imports: [
    NzAvatarModule,
    NzCardModule,
    NzDescriptionsModule,
    NzButtonModule,
    NzTagModule,
  ],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent {
  private readonly authStore = inject(AuthStore);
  readonly user = this.authStore.user;
}
