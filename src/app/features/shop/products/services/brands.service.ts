import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../../shop.model';

import { environment } from '../../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  private readonly brandsUrl = `${this.apiUrl}/brands`;

  getBrands(categoryId?: number) {
    let params = new HttpParams();

    if (categoryId !== undefined) {
      params = params.set('categoryId', categoryId);
    }

    return this.http.get<Brand[]>(this.brandsUrl, { params });
  }
}
