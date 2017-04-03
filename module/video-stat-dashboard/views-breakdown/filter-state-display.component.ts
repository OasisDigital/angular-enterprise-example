import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ageRanges } from '@oasisdigital/age-range';

import { IViewsFilterState } from '../state/views-filter-state';

@Component({
  selector: 'filter-state-display',
  templateUrl: './filter-state-display.component.html'
})
export class FilterStateDisplayComponent {
  @Input() viewsFilterState: IViewsFilterState;
  @Output() removeGroup = new EventEmitter<number>();
  ageRanges = ageRanges;

  removeAgeGroup(group: number) {
    this.removeGroup.emit(group);
  }
}
