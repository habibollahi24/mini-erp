import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { ProductCart } from './cart.model';
import { Product } from '../../../features/shop/shop.model';

export const CartStore = signalStore(
  { providedIn: 'root' },

  withState({
    items:
      (JSON.parse(
        localStorage.getItem('cart-items') ?? '[]',
      ) as ProductCart[]) || new Array<ProductCart>(),
  }),

  withComputed(({ items }) => {
    const totalItems = computed(() =>
      items().reduce((total, item) => total + item.quantity, 0),
    );

    const subtotal = computed(() =>
      items().reduce(
        (total, item) => total + item.finalPrice * item.quantity,
        0,
      ),
    );

    const isEmpty = computed(() => items().length === 0);

    const inCartIds = computed(() => items().map((i) => i.id));

    return { totalItems, subtotal, isEmpty, inCartIds };
  }),

  withMethods((store) => ({
    addToCart(product: Product) {
      const cartItems = store.items();

      const isProductExistInCart = cartItems.find((c) => c.id === product.id);

      if (!isProductExistInCart) {
        return patchState(store, {
          items: [...store.items(), { ...product, quantity: 1 }],
        });
      }

      const UpdatedCart = cartItems.map((cart) => {
        if (cart.id === product.id) {
          return { ...cart, quantity: cart.quantity + 1 };
        }
        return cart;
      });

      return patchState(store, { items: UpdatedCart });
    },
    increaseQuantity(id: number) {
      const cartItems = store.items();

      const findedProductCart = cartItems.find((c) => c.id === id);

      if (!findedProductCart) return;

      findedProductCart.quantity++;

      patchState(store, { items: store.items() });
    },
    decreaseQuantity(id: number) {
      const cartItems = store.items();

      const findedProductCart = cartItems.find((c) => c.id === id);

      if (!findedProductCart) return;

      findedProductCart.quantity--;

      patchState(store, { items: store.items() });
    },
    removeFromCart(id: number) {
      const cartItems = store.items();

      const filteredProductCart = cartItems.filter((c) => c.id !== id);

      console.log(filteredProductCart);

      patchState(store, { items: filteredProductCart });
    },
  })),

  withHooks({
    onInit(store) {
      effect(() => {
        const cartItems = store.items();
        localStorage.setItem('cart-items', JSON.stringify(cartItems));
      });
    },
  }),
);
