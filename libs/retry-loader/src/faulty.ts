// This observable transformation can be used to simulate a faulty
// network or backend service; it adds random delays and random
// failure probability.

// Wire it in to an observable stream with .let().

import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { _throw } from 'rxjs/observable/throw';
import { timer } from 'rxjs/observable/timer';
import { flatMap } from 'rxjs/operators';

export interface IFaultyOptions {
  errorProbability?: number;
  maxDelayMs?: number;
}

const DEFAULT_OPTIONS = {
  errorProbability: 0.3,
  maxDelayMs: 1000
};

export function faulty<T>(options?: IFaultyOptions): (source: Observable<T>) => Observable<T> {
  options = Object.assign({}, DEFAULT_OPTIONS, options);
  return (source) => defer<T>(() => {
    return timer(Math.random() * options.maxDelayMs)
      .pipe(flatMap(_value =>
        (Math.random() < options.errorProbability) ?
          _throw(new Error('Failed in faulty')) :
          source));
  });
}
