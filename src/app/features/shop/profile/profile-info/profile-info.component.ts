import { Component, inject } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AuthStore } from '../../../../store/auth.store';
import { Router } from '@angular/router';

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
  private readonly router = inject(Router);
  readonly user = this.authStore.user;

  logout() {
    this.authStore.logout$().subscribe({
      next: (res) => {
        this.router.navigateByUrl('');
      },

      error: () => {
        this.router.navigateByUrl('');
      },
    });
  }
}
