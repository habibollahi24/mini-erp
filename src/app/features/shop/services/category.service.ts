import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../shop.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  private readonly categoriesUrl = `${this.apiUrl}/categories`;

  getCategories() {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
}
