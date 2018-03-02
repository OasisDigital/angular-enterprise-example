import { Component } from '@angular/core';

import { AppService } from './services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(_appService: AppService) {
    // Have it injected for the side effect of triggering the data population.
    // This is an anti-pattern, right?
  }
}
