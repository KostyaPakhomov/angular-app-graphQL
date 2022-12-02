import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ModulesModule } from '../modules/modules.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NoItemsComponent } from './no-items/no-items.component';

@NgModule({
  declarations: [SidenavComponent, NoItemsComponent],
  imports: [CommonModule, ModulesModule, NgxMaskModule],
  exports: [SidenavComponent, NoItemsComponent],
})
export class ComponentsModule {}
