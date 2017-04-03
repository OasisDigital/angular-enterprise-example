import { NgModule } from '@angular/core';

import { EnumToRangePipe } from './enum-to-range.pipe';

@NgModule({
  declarations: [
    EnumToRangePipe
  ],
  exports: [
    EnumToRangePipe
  ]
})
export class AgeRangeModule { }
