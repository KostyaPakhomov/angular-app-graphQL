import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, ShellRoutingModule],
})
export class ShellModule {
  constructor(@Optional() @SkipSelf() parentModule: ShellModule) {
    if (parentModule) {
      const msg = `ShellModule has already been loaded.
        Import ShellModule once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
}
