import { Component } from '@angular/core';

import { ViewsFilterService } from '../services/views-filter.service';

@Component({
  selector: 'views-filter',
  templateUrl: './views-filter.component.html'
})
export class ViewsFilterComponent {

  constructor(public vfs: ViewsFilterService) { }
}
