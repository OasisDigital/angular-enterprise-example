import { Pipe, PipeTransform } from '@angular/core';

import { ageRanges } from './age-ranges';

@Pipe({
  name: 'enumToRange'
})
export class EnumToRangePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    try {
      const index = parseInt(value, 10);
      return ageRanges[index].label;
    } catch (error) {
      return null;
    }
  }
}
