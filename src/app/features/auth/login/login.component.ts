import { Component, effect, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthStore } from '../../../store/auth.store';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { DemoRoleSelectionComponent } from '../components/demo-role-selection/demo-role-selection.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    DemoRoleSelectionComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  readonly authStore = inject(AuthStore);
  readonly message = inject(NzMessageService);
  readonly router = inject(Router);

  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      // Validators.minLength(6),
    ]),
    remember: this.fb.control(true),
  });

  submitForm(): void {
    if (this.form.valid) {
      const credentials = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      };
      this.authStore.login$(credentials).subscribe({
        next: (res) => {
          this.message.success('با موفقیت وارد شدید. ');
          const role = res.user.role;
          if (role === 'customer') {
            this.router.navigateByUrl('/shop');
          } else {
            this.router.navigateByUrl('/admin');
          }
        },
        error: (err) => {
          this.message.error('رمز عبور یا ایمیل اشتباه است.');
        },
      });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
