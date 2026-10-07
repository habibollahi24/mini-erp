import { Component, inject } from '@angular/core';
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
import { AuthStore } from '../../../core/auth/auth.store';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(NonNullableFormBuilder);
  readonly authStore = inject(AuthStore);

  form = this.fb.group({
    firstName: this.fb.control('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: this.fb.control('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitForm(): void {
    if (this.form.valid) {
      const credentials = {
        ...this.form.getRawValue(),
      };
      console.log(credentials);
      this.authStore.register(credentials);
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
