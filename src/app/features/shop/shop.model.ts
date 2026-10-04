export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  parentId: number | null;
  isActive: boolean;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}
export interface Product {
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
  costPrice: number;
  discount: number;
  finalPrice: number;
  stock: number;
  minStock: number;
  maxStock: number;
  sku: string;
  status: string;
  isFeatured: boolean;
  tags: string[];
  images: string[];
  weight: number;
  warranty: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}
export interface PaginatedResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}

export interface ProductQuery {
  page: number;
  limit: number;
  categoryId?: number;
  search?: string;
  brand?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
}
export interface Brand {
  id: number;
  name: string;
  categoryId: number;
}
