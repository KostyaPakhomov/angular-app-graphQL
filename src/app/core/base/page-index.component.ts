import {
  ChangeDetectorRef,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  skip,
} from 'rxjs/operators';
import { trackByFn } from '../helpers';
import { ProductPagination } from '../models';
import { DataService } from './data.service';
import { Item } from './item';

export interface FilterValues {
  page?: string;
  perPage?: number;
  search?: number;
  supplierID?: number;
  categoryID?: number;
  OR?: any;
}
@UntilDestroy()
@Injectable()
export abstract class PageIndexComponent<T, K extends Item>
  implements OnInit, OnDestroy
{
  readonly trackByFn = trackByFn;
  paginatedData: ProductPagination<T, K> = {} as ProductPagination<T, K>;
  // TODO Change type
  isLoading = false;
  protected hasPagination = false;
  private _items: K[] = [];
  search$: Subject<string> = new Subject();
  index = 1;
  searchParams!: string | null;
  isSearching = false;
  count = 0;
  perPageValue = 5;

  get items(): K[] {
    if (this.hasPagination) {
      return this.paginatedData?.items!;
    }
    return this._items;
  }
  set items(value: K[]) {
    if (this.hasPagination) {
      this.paginatedData.items! = value;
    }
    this._items = value;
  }
  get queryParams() {
    return this.route.snapshot.queryParams;
  }

  get currentPage(): number {
    return this.route.snapshot.queryParamMap.get('page')
      ? +this.route.snapshot.queryParamMap.get('page')!
      : this.index;
  }

  get perPage(): number {
    return this.perPageValue;
  }
  get prevPage(): number {
    return this.index - 1;
  }
  get nextPage(): number {
    return this.index + 1;
  }
  get lastPage(): number {
    return Math.ceil(this.paginatedData.count / this.perPage);
  }

  constructor(
    protected dataService: DataService<T, K>,
    protected route: ActivatedRoute,
    protected router: Router,
    protected cdRef: ChangeDetectorRef
  ) {}

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {
    this.subscribeToQueryParamsChange();
  }

  goToPage(index: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: index,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    this.cdRef.detectChanges();
    this.index = index;
  }

  search() {
    this.search$
      .pipe(
        skip(1),
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(400)
      )
      .subscribe(res => {
        if (!this.items) {
          return;
        }
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            search: res || null,
            page: 1,
          },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      });
  }

  defaultEvent(event: Event): void {
    event?.stopPropagation();
    event?.preventDefault();
  }

  ngOnDestroy(): void {
    this.search$.complete();
  }

  /**
   * @description data object for sending at server after query params change
   */
  protected preparedQueryParams(params: Params): Params {
    const countItems = { perPage: this.perPage };

    const newParams = Object.assign(countItems, { ...params });
    Object.keys(newParams).forEach(el => {
      newParams[el] = !isNaN(Number(newParams[el]))
        ? Number(newParams[el])
        : newParams[el];
      if (newParams[el] === 0 || newParams[el] === '') {
        delete newParams[el];
      }
      if (Array.isArray(newParams[el])) {
        newParams['OR'] = newParams[el].map((res: any, i: number) => {
          return { supplierID: Number(newParams[el][i]) };
        });
        console.log(newParams, 'create OR');

        delete newParams[el];
      }
    });

    return { ...newParams };
  }

  protected loadItems(params?: Record<string, any>): void {
    this.isLoading = true;
    this.dataService
      .index(params)
      .pipe(
        untilDestroyed(this),
        finalize(() => {
          this.isLoading = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe(res => {
        this.items = res;
      });
  }

  protected loadPaginatedItems(params?: Record<string, any>, type = ''): void {
    this.isLoading = true;
    this.count++;
    this.dataService
      .indexPaginated(params)
      .pipe(
        untilDestroyed(this),
        finalize(() => {
          this.isLoading = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe(res => {
        if (this.isSearching) {
          this.index = 0;
          this.isSearching = false;
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              page: 1,
            },
            queryParamsHandling: 'merge',
            replaceUrl: true,
          });
        }
        this.paginatedData = res;
      });
  }

  private subscribeToQueryParamsChange() {
    this.route.queryParams.subscribe(params => {
      if (!this.hasPagination) {
        this.loadItems(this.preparedQueryParams(params));
      } else {
        this.loadPaginatedItems(this.preparedQueryParams(params));
      }
    });
  }

  editItem(itemId: number | string) {
    this.router.navigate(['./', itemId], { relativeTo: this.route });
  }
}
