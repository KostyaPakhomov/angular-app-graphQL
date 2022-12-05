import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModulesModule } from '../modules/modules.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NoItemsComponent } from './no-items/no-items.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [SidenavComponent, NoItemsComponent, LoadingComponent],
  imports: [CommonModule, ModulesModule],
  exports: [SidenavComponent, NoItemsComponent, LoadingComponent],
})
export class ComponentsModule {}
