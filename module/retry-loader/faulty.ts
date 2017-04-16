// This observable transformation can be used to simulate a faulty
// network or backend service; it adds random delays and random
// failure probability.

// Wire it in to an observable stream with .let().

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mergeMap';

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
  return (source) => Observable.defer<T>(() => {
    return Observable
      .timer(Math.random() * options.maxDelayMs)
      .flatMap(value =>
        (Math.random() < options.errorProbability) ?
          Observable.throw(new Error('Failed in faulty')) :
          source);
  });
}
