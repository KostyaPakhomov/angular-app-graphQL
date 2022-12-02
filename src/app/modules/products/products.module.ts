import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { SharedModule } from 'Shared/shared.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ApolloModule,
    NgxMaskModule.forChild(),
  ],
  providers: [],
})
export class ProductsModule {}
