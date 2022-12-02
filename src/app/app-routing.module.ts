import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from 'Core/routes';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: `${AppRoute.APP}` },
  {
    path: `${AppRoute.APP}`,
    loadChildren: () => import('./shell/shell.module').then(m => m.ShellModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: `${AppRoute.APP}` },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true,
      relativeLinkResolution: 'corrected',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
