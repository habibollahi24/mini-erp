import { ParamMap } from '@angular/router';
import { ProductQuery } from '../shop.model';

export function mapParamsToProductQuery(
  params: ParamMap,
  pageSize: number,
): ProductQuery {
  // const page = params.get('page');
  const categoryId = params.get('categoryId');
  const minPrice = params.get('minPrice');
  const maxPrice = params.get('maxPrice');

  return {
    page: Number(params.get('page')) ?? undefined,

    limit: pageSize,

    categoryId: categoryId ? Number(categoryId) : undefined,

    search: params.get('search') ?? undefined,

    brand: params.get('brand') ?? undefined,

    sort: params.get('sort') ?? undefined,

    minPrice: minPrice ? Number(minPrice) : undefined,

    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  };
}
