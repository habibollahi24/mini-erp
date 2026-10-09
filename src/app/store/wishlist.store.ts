import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../features/shop/shop.model';

export interface WishlistState {
  favariteProducts: Product[];
}

export const WishlistStore = signalStore(
  { providedIn: 'root' },

  withState<WishlistState>({
    // favariteProducts: new Array<Product>(),
    favariteProducts:
      (JSON.parse(localStorage.getItem('fav-product') ?? '[]') as Product[]) ||
      new Array<Product>(),
  }),

  withComputed(({ favariteProducts }) => {
    const count = computed(() => favariteProducts().length);

    const isFavorite = computed(() => {
      return (id: number) => {
        return favariteProducts().find((fp) => fp.id === id);
      };
    });

    return { count, isFavorite };
  }),

  withMethods((store) => ({
    add(product: Product) {
      if (store.favariteProducts().find((fp) => fp.id === product.id)) {
        patchState(store, (prevState) => {
          return {
            favariteProducts: prevState.favariteProducts.filter(
              (pf) => pf.id !== product.id,
            ),
          };
        });
      } else {
        patchState(store, (prevState) => {
          return { favariteProducts: [...prevState.favariteProducts, product] };
        });
      }
    },
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const favariteProducts = store.favariteProducts();
        localStorage.setItem('fav-product', JSON.stringify(favariteProducts));
      });
    },
  }),
);
