import {
  ChangeDetectorRef,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CharactersPagination } from 'Core/models';
import { HandlerErrorService } from 'Core/services';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  skip,
} from 'rxjs/operators';
import { trackByFn } from '../helpers';
import { DataService } from './data.service';
import { Item } from './item';

export interface FilterValues {
  page?: string;
  search?: string;
  gender?: string;
  character?: number[];
}
@UntilDestroy()
@Injectable()
export abstract class PageIndexComponent<T, K extends Item>
  implements OnInit, OnDestroy
{
  readonly trackByFn = trackByFn;
  paginatedData: CharactersPagination<T, K> = {} as CharactersPagination<T, K>;
  isLoading = false;
  protected hasPagination = false;
  private _items: K[] = [];
  search$: Subject<string> = new Subject();
  index = 1;
  isSearching = false;
  count = 0;
  isError: boolean = false;

  get items(): K[] {
    if (this.hasPagination) {
      return this.paginatedData?.results!;
    }
    return this._items;
  }
  set items(value: K[]) {
    if (this.hasPagination) {
      this.paginatedData.results! = value;
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

  get lastPage(): number {
    return this.paginatedData.info.pages!;
  }
  get totalCount(): number {
    return this.paginatedData.info.count!;
  }

  constructor(
    protected dataService: DataService<T, K>,
    protected route: ActivatedRoute,
    protected router: Router,
    protected cdRef: ChangeDetectorRef,
    protected error: HandlerErrorService
  ) {}

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {
    this.subscribeToQueryParamsChange();
    this.error.$error.subscribe(res => {
      this.isError = true;
      this.items = [];
    });
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
    this.index = index;
    this.cdRef.detectChanges();
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
        this.isSearching = true;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            search: res || null,
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
    const newParams = { ...params };
    Object.keys(newParams).forEach(el => {
      newParams[el] = !isNaN(Number(newParams[el]))
        ? Number(newParams[el])
        : newParams[el];
      if (Array.isArray(newParams[el])) {
        newParams[el].forEach((res: any, i: number) => {
          newParams[el][i] = Number(newParams[el][i]);
        });
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
        this.index = 1;
        this.isSearching = false;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: 1,
          },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
        this.isError = false;
        let resArr = [...res];
        Object.keys(params!).forEach(param => {
          if (param !== 'page' && param !== 'character') {
            if (param === 'gender') {
              resArr = res.filter(
                (el: any) =>
                  el[param].toLowerCase() === params![param].toLowerCase()
              );
            } else {
              resArr = res.filter((el: any) =>
                el[param === 'search' ? 'name' : param]
                  .toLowerCase()
                  .includes(params![param].toLowerCase())
              );
            }
          }
        });
        this.items = resArr;
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
          this.index = 1;
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
        this.isError = false;
        this.paginatedData = res;
      });
  }

  private subscribeToQueryParamsChange() {
    this.route.queryParams.subscribe(params => {
      const currentParams = { ...params };
      Object.keys(currentParams).forEach(el => {
        if (
          currentParams[el] === 0 ||
          currentParams[el] === '' ||
          currentParams[el].length === 0
        ) {
          delete currentParams[el];
        }
      });
      this.hasPagination = Object.keys(currentParams).includes('character')
        ? false
        : true;

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
