import {
  afterNextRender,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { map, tap } from 'rxjs';

@Component({
  selector: 'shop-products-pagination',
  imports: [NzPaginationModule],
  templateUrl: './products-pagination.component.html',
  styleUrl: './products-pagination.component.scss',
})
export class ProductsPaginationComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  totalItems = input.required<number>();
  pageSize = input.required<number>();

  pp = signal(1);

  constructor() {
    // afterNextRender(() => {
    // this.route.queryParamMap.pipe(
    //   tap((params) => this.pp.set(Number(params.get('page')))),
    // );
    // });

    effect(() => {
      console.log(this.pp());
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) =>
      this.pp.set(Number(params.get('page'))),
    );
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.route.queryParamMap.pipe(
    //   tap((params) => this.pp.set(Number(params.get('page')))),
    // );
  }

  // readonly currentPage = toSignal(
  //   this.route.queryParamMap.pipe(map((params) => Number(params.get('page')))),
  //   { initialValue: 1 },
  // );

  onPageChange(page: number): void {
    this.pp.set(page);
    this.router.navigate([], {
      queryParams: {
        page,
      },
      queryParamsHandling: 'merge',
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
