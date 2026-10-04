import { Product } from '../../../features/shop/shop.model';

export interface ProductCart extends Product {
  quantity: number;
}

// const foo: ProductCart = {};

export interface CartItem {
  product: Product;
  quantity: number;
}

type Store = {
  items: [
    {
      id: number;
      name: string;
      slug: string;
      description: string;
      shortDescription: string;
      categoryId: number;
      supplierId: number;
      brand: string;
      model: string;
      price: number;
      //.
      //.
      //.
      quantity: number;
    },

    {},
    {},
  ];

  //   totalItems: Signal<number>;
  //     subtotal: Signal<number>;
  //     isEmpty
};
