import { ParamMap } from '@angular/router';
import { ProductQuery } from '../shop.model';

export function mapParamsToProductQuery(
  params: ParamMap,
  pageSize: number,
): ProductQuery {
  const categoryId = params.get('categoryId');
  const minPrice = params.get('minPrice');
  const maxPrice = params.get('maxPrice');

  return {
    page: Number(params.get('page') ?? 1),

    limit: pageSize,

    categoryId: categoryId ? Number(categoryId) : undefined,

    search: params.get('search') ?? undefined,

    brand: params.get('brand') ?? undefined,

    sort: params.get('sort') ?? undefined,

    minPrice: minPrice ? Number(minPrice) : undefined,

    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  };
}
// const categoryId = params.get('categoryId');
//           const page = params.get('page');
//           const search = params.get('search') ?? undefined;
//           const brand = params.get('brand') ?? undefined;
//           const sort = params.get('sort') ?? undefined;
//           const minPrice = params.get('minPrice')
//             ? Number(params.get('minPrice'))
//             : undefined;

//           const maxPrice = params.get('maxPrice')
//             ? Number(params.get('maxPrice'))
//             : undefined;

//           return {
//             page: Number(page ?? 1),
//             limit: this.pageSize,
//             categoryId: categoryId ? Number(categoryId) : undefined,
//             search,
//             brand,
//             sort,
//             minPrice,
//             maxPrice,
//           };
