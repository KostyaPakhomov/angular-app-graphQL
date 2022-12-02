import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { shellRoutes } from 'Core/routes';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: `${shellRoutes.PRODUCTS}` },
      {
        path: shellRoutes.PRODUCTS,
        loadChildren: () =>
          import('Modules/products/products.module').then(
            m => m.ProductsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
