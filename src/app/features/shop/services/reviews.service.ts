import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { forkJoin, map, of, switchMap, tap } from 'rxjs';

export interface Review {
  id: number;
  productId: number;
  customerId: number;
  orderId: number;
  rating: number;
  title: string;
  comment: string;
  status: 'published' | 'pending';
  createdAt: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  avatar: string;
}

export interface ReviewWithCustomer extends Review {
  customer: Customer;
}
// {
//   id: 1,
//   productId: 1,
//   customerId: 1,
//   rating: 5,
//   title: 'برای کار عالیه',
//   comment: '...',
//   createdAt: '2026-01-12',

//   customer: {
//     id: 1,
//     firstName: 'علی',
//     lastName: 'احمدی',
//     avatar: '...'
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private http = inject(HttpClient);
  getReviews(productId: number) {
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews`, {
      params: {
        productId,
        status: 'published',
      },
    });
  }
  getCustomer(id: number) {
    return this.http.get<Customer>(`${environment.apiUrl}/users/${id}`);
  }

  getReviewsWithCustomers(productId: number) {
    return this.getReviews(productId).pipe(
      switchMap((reviews) => {
        const customerIds = [
          ...new Set(reviews.map((review) => review.customerId)),
        ];

        if (!customerIds.length) {
          return of([]);
        }

        return forkJoin(customerIds.map((id) => this.getCustomer(id))).pipe(
          map((customers) => {
            const customerMap = new Map(
              customers.map((customer) => [customer.id, customer]),
            );

            return reviews.map((review) => ({
              ...review,
              customer: customerMap.get(review.customerId)!,
            }));
          }),
        );
      }),
    );
  }
}
