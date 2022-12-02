import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  ElementRef,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, pluck } from 'rxjs/operators';
import { DataService } from './data.service';
import { Item } from './item';

@UntilDestroy()
@Injectable()
export abstract class PageShowComponent<T, K extends Item>
  implements OnInit, OnDestroy
{
  pageContent!: ElementRef<HTMLElement>;

  item$ = new BehaviorSubject<Item>(this.item);
  isLoading = false;
  isLoadingFailed = false;
  skip = false;
  protected idFromRouteKey = 'id';

  private _item!: K;

  get item(): K {
    return this._item;
  }

  set item(value: K) {
    this._item = value;
    this.item$.next(value);
  }

  get itemId(): string {
    return this.route.snapshot.paramMap.get(this.idFromRouteKey) as string;
  }

  get itemId$(): Observable<string> {
    return this.route.params.pipe(pluck(this.idFromRouteKey));
  }

  constructor(
    protected dataService: DataService<T, K>,
    protected route: ActivatedRoute,
    protected router: Router,
    protected elRef: ElementRef,
    protected cdRef: ChangeDetectorRef,
    protected location: Location
  ) {}

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {
    this.loadItem();
  }

  ngOnDestroy(): void {
    this.item$.complete();
  }

  protected loadItem(): Subscription {
    this.isLoading = true;
    return this.dataService
      .show(+this.itemId)
      .pipe(
        untilDestroyed(this),
        finalize(() => {
          this.isLoading = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe({
        next: res => {
          this.item = res;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingFailed = true;
          // this.handleError(err);
        },
      });
  }

  scrollContentToTop(): void {
    if (this.pageContent?.nativeElement) {
      this.pageContent.nativeElement.scrollTop = 0;
    }
  }

  // protected handleError(err: HttpErrorResponse): void {
  //   if (err.status === 422) {
  //     handleFormHttpError(this.form, err);

  //     for (const value of Object.values(err.error.errors)) {
  //       const errorValue = Array.isArray(value) ? value.join(', ') : value;
  //     }
  //   } else {
  //     throw err;
  //   }
  // }

  goBack(): void {
    this.location.back();
  }
}
