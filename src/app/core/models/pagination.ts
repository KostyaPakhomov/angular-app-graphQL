import { Type } from '@angular/core';

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Pagination<T, K> {
  viewer: Viewer<T, K>;
}

export interface Viewer<T, K> {
  productPagination: ProductPagination<T, K>;
  product: T;
}

export class ProductPagination<T, K> {
  items!: K[];
  pageInfo!: PageInfo;
  count!: number;

  get hasNextPage(): boolean {
    return this.pageInfo?.hasNextPage!;
  }
  get hasPreviousPage(): boolean {
    return this.pageInfo?.hasPreviousPage!;
  }

  constructor(data: ProductPagination<T, K>, ctor: Type<K>) {
    Object.assign(this, data);
    this.items = data.items.map(item => new ctor(item));
  }
}
