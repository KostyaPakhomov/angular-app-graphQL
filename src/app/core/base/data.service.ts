import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { itemsQuery, loadOneProduct, loadProducts } from 'Core/constants/items';
import { HandlerErrorService } from 'Core/services/handlerError.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Pagination, ProductPagination } from '../models/pagination';
import { FilterValues } from './page-index.component';

@Injectable()
export abstract class DataService<T, K> {
  protected abstract ctor: Type<K>;
  isRestore = false;

  constructor(
    protected http: HttpClient,
    private apollo: Apollo,
    private errorService: HandlerErrorService
  ) {}
  itemsQueryRef: QueryRef<Pagination<T, K>> = this.apollo.watchQuery({
    query: itemsQuery,
  });

  index(params?: Record<string, any>) {
    return this.apollo
      .query<T[]>({
        query: loadOneProduct,
        variables: { params },
      })
      .pipe(
        map(response => response?.data.map(item => new this.ctor(item))),
        catchError(this.errorService.handleError)
      );
  }

  indexPaginated(params?: Record<string, any>) {
    let { page, perPage, categoryID, supplierID, search, OR }: FilterValues =
      params!;
    return this.apollo
      .query<Pagination<T, K>>({
        query: loadProducts,
        variables: {
          page,
          perPage,
          categoryID,
          supplierID,
          unitPrice: search,
          OR,
        },
      })
      .pipe(
        map(
          response =>
            new ProductPagination(
              response?.data!.viewer.productPagination,
              this.ctor
            )
        ),
        catchError(this.errorService.handleError)
      );
  }

  refetch(data?: Pagination<T, K>) {
    this.itemsQueryRef.refetch(data);
  }

  show(productID: number) {
    return this.apollo
      .query<Pagination<T, K>>({
        query: loadOneProduct,
        variables: { productID },
      })
      .pipe(
        tap(res => console.log(res)),
        map(response => new this.ctor(response.data.viewer.product)),
        catchError(this.errorService.handleError)
      );
  }
}
