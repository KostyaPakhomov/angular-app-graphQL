import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModulesModule } from './modules/modules.module';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [ModulesModule, ComponentsModule, DirectivesModule],
})
export class SharedModule {}
