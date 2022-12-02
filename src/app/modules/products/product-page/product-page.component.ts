import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageShowComponent } from 'Core/base/page-show.component';
import { Location } from '@angular/common';
import { Product, ProductsResponse } from 'Core/models/northwind';
import { ProductsService } from 'Core/services';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  providers: [ProductsService],

  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent
  extends PageShowComponent<ProductsResponse, Product>
  implements OnInit
{
  constructor(
    protected override dataService: ProductsService,
    protected override cdRef: ChangeDetectorRef,
    protected override router: Router,
    protected override route: ActivatedRoute,
    protected override elRef: ElementRef,
    protected override location: Location
  ) {
    super(dataService, route, router, elRef, cdRef, location);
  }
  override ngOnInit(): void {
    super.ngOnInit();
  }
}
