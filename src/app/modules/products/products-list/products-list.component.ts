import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PageIndexComponent } from 'Core/base/page-index.component';
import { Product, ProductsResponse } from 'Core/models/northwind';
import { ProductsService } from 'Core/services';

@UntilDestroy()
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [ProductsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent
  extends PageIndexComponent<ProductsResponse, Product>
  implements OnInit
{
  activeItemIndex = 0;
  override hasPagination = true;
  header = 'Northwind Traders';

  constructor(
    protected override dataService: ProductsService,
    protected override cdRef: ChangeDetectorRef,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) {
    super(dataService, route, router, cdRef);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.search();
    this.cdRef.detectChanges();
  }
}
