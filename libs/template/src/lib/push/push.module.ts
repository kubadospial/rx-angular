import { NgModule } from '@angular/core';
import { PushPipe } from './push.pipe';
const DECLARATIONS = [PushPipe];
@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class PushModule {}
