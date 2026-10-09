import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginatedResponse, Product, ProductQuery } from '../shop.model';
import { map } from 'rxjs';

import { environment } from '../../../../../environment/environment';

interface QueryState {
  page: number;
  limit: number;
  categoryId?: number;
  brand?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  private readonly productsUrl = `${this.apiUrl}/products`;

  getProducts(query: ProductQuery) {
    const { page, limit, categoryId, search, brand, sort, maxPrice, minPrice } =
      query;

    let params = new HttpParams()
      .set('_expand', 'category')
      .set('_limit', limit);
    // .set('_page', page);

    //added all Fillter to Url
    if (page !== undefined) {
      params = params.set('_page', page);
    }
    if (categoryId !== undefined) {
      params = params.set('categoryId', categoryId);
    }
    if (search !== undefined) {
      params = params.set('name_like', search);
    }
    if (brand !== undefined) {
      params = params.set('brand', brand);
    }
    if (sort !== undefined) {
      const [field, order] = sort.split('-');
      params = params.set('_sort', field).set('_order', order);
    }
    if (minPrice !== undefined) {
      params = params.set('price_gte', minPrice);
    }

    if (maxPrice !== undefined) {
      params = params.set('price_lte', maxPrice);
    }

    return this.http.get<Product[]>(this.productsUrl, {
      params,
      observe: 'response',
    });
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.productsUrl}/${id}?_expand=category`);
  }
}
