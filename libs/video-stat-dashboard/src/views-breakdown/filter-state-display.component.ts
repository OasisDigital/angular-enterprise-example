import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ageRanges } from '@enterprise-example/age-range';

import { ViewsFilterState } from '../+state/video-stats.interfaces';

@Component({
  selector: 'filter-state-display',
  templateUrl: './filter-state-display.component.html'
})
export class FilterStateDisplayComponent {
  @Input() viewsFilterState: ViewsFilterState;
  @Output() removeGroup = new EventEmitter<number>();
  ageRanges = ageRanges;

  removeAgeGroup(group: number) {
    this.removeGroup.emit(group);
  }
}
