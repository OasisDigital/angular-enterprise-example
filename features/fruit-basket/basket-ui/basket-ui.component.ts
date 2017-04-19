import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as state from '../state/state';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Component({
  selector: 'basket-ui',
  templateUrl: './basket-ui.component.html'
})
export class BasketUiComponent {
  berry$: Observable<number>;
  apple$: Observable<number>;
  total$: Observable<number>;

  constructor(public store: Store<state.IAppState>) {
    this.berry$ = store.select(s => s.fruit.berryCounter);
    this.apple$ = store.select(s => s.fruit.appleCounter);
    this.total$ = store.map(s => s.fruit.berryCounter + s.fruit.appleCounter);
  }

  pickBerry() {
    this.store.dispatch({ type: state.PICK_BERRY });
  }

  pickApple() {
    this.store.dispatch({ type: state.PICK_APPLE });
  }

  pickApples() {
    this.store.dispatch({ type: state.PICK_APPLES, payload: 3 });
  }

  empty() {
    this.store.dispatch({ type: state.EMPTY_CART });
  }
}
