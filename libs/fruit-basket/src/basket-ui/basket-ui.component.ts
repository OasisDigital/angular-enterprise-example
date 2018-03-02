import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as state from '../state/state';

@Component({
  selector: 'basket-ui',
  templateUrl: './basket-ui.component.html'
})
export class BasketUiComponent {
  berry: Observable<number>;
  apple: Observable<number>;
  total: Observable<number>;

  constructor(public store: Store<state.IAppState>) {
    this.berry = store.select(s => s.fruit.berryCounter);
    this.apple = store.select(s => s.fruit.appleCounter);
    this.total = store.select(s => s.fruit.berryCounter + s.fruit.appleCounter);
  }

  pickBerry() {
    this.store.dispatch(new state.PickBerryAction());
  }

  pickApple() {
    this.store.dispatch(new state.PickAppleAction());
  }

  pickApples() {
    this.store.dispatch(new state.PickApplesAction(3));
  }

  empty() {
    this.store.dispatch(new state.EmptyCartAction());
  }
}
