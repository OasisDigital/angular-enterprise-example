import { Component } from '@angular/core';

import { AppService } from './state/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(appService: AppService) {
    // have it injected to trigger the data population
  }
}
