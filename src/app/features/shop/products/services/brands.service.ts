import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../../shop.model';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly http = inject(HttpClient);

  private readonly brandsUrl = 'http://localhost:3000/brands';

  getBrands(categoryId?: number) {
    let params = new HttpParams();

    if (categoryId !== undefined) {
      params = params.set('categoryId', categoryId);
    }

    return this.http.get<Brand[]>(this.brandsUrl, { params });
  }
}
