import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { BasketUiComponent } from './basket-ui/basket-ui.component';
import { CounterDisplayComponent } from './counter-display/counter-display.component';

const ROUTES: Route[] = [
  { path: 'fruit', component: BasketUiComponent }
];

@NgModule({
  declarations: [
    BasketUiComponent,
    CounterDisplayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class FruitBasketModule { }
