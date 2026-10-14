import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthStore } from '../../../../store/auth.store';
import { NzIconModule } from 'ng-zorro-antd/icon';

type DemoRole = 'customer' | 'employee' | 'manager' | 'admin';

@Component({
  selector: 'auth-demo-role-selection',
  imports: [NzButtonModule, NzIconModule],
  templateUrl: './demo-role-selection.component.html',
  styleUrl: './demo-role-selection.component.scss',
})
export class DemoRoleSelectionComponent {
  private readonly router = inject(Router);
  readonly authStore = inject(AuthStore);

  readonly selectedDemoRole = signal<DemoRole | null>(null);

  private readonly demoAccounts: Record<
    DemoRole,
    { email: string; password: string }
  > = {
    customer: {
      email: 'habibollahi24@gmail.com',
      password: '123456789',
    },
    employee: {
      email: 'reza@example.com',
      password: 'admin@123',
    },
    manager: {
      email: 'sara@example.com',
      password: 'admin@123',
    },
    admin: {
      email: 'ali@example.com',
      password: 'admin@123',
    },
  };

  form = input.required<
    FormGroup<{
      email: FormControl<string>;
      password: FormControl<string>;
      remember: FormControl<boolean>;
    }>
  >();

  selectDemoRole(role: DemoRole): void {
    this.selectedDemoRole.set(role);

    const account = this.demoAccounts[role];

    this.form().patchValue({
      email: account.email,
      password: account.password,
    });
  }
}
