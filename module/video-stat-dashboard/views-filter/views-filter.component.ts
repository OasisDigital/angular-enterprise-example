import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ViewsFilterService } from '../state/views-filter.service';

@Component({
  selector: 'views-filter',
  templateUrl: './views-filter.component.html'
})
export class ViewsFilterComponent {

  constructor(public vfs: ViewsFilterService) { }
}
