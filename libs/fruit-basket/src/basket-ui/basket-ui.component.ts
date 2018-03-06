import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PickBerryAction, AppState, PickApplesAction, EmptyCartAction } from '../state/state';

@Component({
  selector: 'basket-ui',
  templateUrl: './basket-ui.component.html'
})
export class BasketUiComponent {
  berry: Observable<number>;
  apple: Observable<number>;
  total: Observable<number>;

  constructor(public store: Store<AppState>) {
    this.berry = store.select(state => state.fruit.berryCounter);
    this.apple = store.select(state => state.fruit.appleCounter);
    this.total = store.select(state => state.fruit.berryCounter + state.fruit.appleCounter);
  }

  pickBerry() {
    this.store.dispatch(new PickBerryAction());
  }

  pickApple(count: number) {
    this.store.dispatch(new PickApplesAction(count));
  }

  empty() {
    this.store.dispatch(new EmptyCartAction());
  }
}
