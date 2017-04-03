import { Component, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { mapValues, forEach } from 'lodash';

@Component({
  selector: 'views-filter-display',
  templateUrl: './views-filter-display.component.html'
})
export class ViewsFilterDisplayComponent implements OnDestroy {

  filterFormGroup: FormGroup;
  @Input() set region(value: string) {
    this.filterFormGroup.controls['region'].setValue(value, { emitEvent: false });
  };
  @Input() set dateTo(value: number) {
    this.filterFormGroup.controls['dateTo'].setValue(moment(value).format('YYYY-MM-DD'), { emitEvent: false });
  };
  @Input() set dateFrom(value: number) {
    this.filterFormGroup.controls['dateFrom'].setValue(moment(value).format('YYYY-MM-DD'), { emitEvent: false });
  };
  @Input() set age(value: boolean[]) {
    const names = ['minor', 'adults', 'middleAged', 'retired'];
    names.forEach((name, index) =>
      this.filterFormGroup.controls[name].setValue(value[index], { emitEvent: false })
    );
  };

  @Output() regionChange = new EventEmitter<string>();
  @Output() dateToChange = new EventEmitter<number>();
  @Output() dateFromChange = new EventEmitter<number>();
  @Output() ageToggle = new EventEmitter<number>();

  private formSubs: Subscription[] = [];

  constructor(formBuilder: FormBuilder) {
    const fields = {
      region: makeField([], newRegion => this.regionChange.emit(newRegion)),
      dateTo: makeField([], newDateTo => this.dateToChange.emit(moment(newDateTo).valueOf())),
      dateFrom: makeField([], newDateFrom => this.dateFromChange.emit(moment(newDateFrom).valueOf())),
      minor: makeField([], newMinor => this.ageToggle.emit(0)),
      adults: makeField([], newAdults => this.ageToggle.emit(1)),
      middleAged: makeField([], newAdults => this.ageToggle.emit(2)),
      retired: makeField([], newRetired => this.ageToggle.emit(3))
    };
    // Set up the form group
    this.filterFormGroup = formBuilder.group(mapValues(fields, f => f.fieldConfig));

    // Observe changes on the form and pass to smart component
    forEach(fields, (v, k) => this.formSubs.push(this.filterFormGroup.controls[k].valueChanges
      .subscribe(v.changeHandler)));
  }

  // Tear down any subscriptions made while setting up the form
  ngOnDestroy() {
    this.formSubs.forEach(sub => sub.unsubscribe());
  }
}

function makeField(fieldConfig: any[], changeHandler: (any) => void) {
  return { fieldConfig, changeHandler };
}
