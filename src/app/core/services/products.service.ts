import { Injectable } from '@angular/core';
import { DataService } from 'Core/base/data.service';
import { Product, ProductsResponse } from 'Core/models/northwind';

@Injectable()
export class ProductsService extends DataService<ProductsResponse, Product> {
  ctor = Product;
}
