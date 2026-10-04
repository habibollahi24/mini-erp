import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shop-search-box',
  imports: [NzInputModule, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly searchSubject = new Subject<string | null>();

  readonly search = signal('');

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            search: value || null,
            page: 1,
          },
          queryParamsHandling: 'merge',
        });
      });

    this.route.queryParamMap
      .pipe(
        map((params) => params.get('search') ?? ''),
        takeUntilDestroyed(),
      )
      .subscribe((value) => {
        this.search.set(value);
      });
  }

  onSearch(value: string | null): void {
    this.searchSubject.next(value);
  }
}
