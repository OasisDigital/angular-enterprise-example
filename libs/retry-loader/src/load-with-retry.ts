import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { timer } from 'rxjs/observable/timer';
import { map, retryWhen, switchMap, tap, filter, delayWhen } from 'rxjs/operators';

export enum LoadResultStatus {
  InProgress,
  Retrying,
  Waiting,
  Success,
  Error
}

export const StatusStrings = [
  'In Progress',
  'Retrying',
  'Waiting to Retry',
  'Success',
  'Error'
];

export interface LoadResult<T> {
  status: LoadResultStatus;
  data?: T;
  error?: any;
  willRetry?: boolean;
}

export interface LoadWithRetryOptions {
  // To retry once after failure, use attempts=2
  attempts?: number;
  retryDelayMs?: number;
  retryBackoffCoefficient?: number;
  retryMaxDelayMs?: number;
}

const DEFAULT_OPTIONS: LoadWithRetryOptions = {
  attempts: 3,
  retryDelayMs: 2000,
  retryBackoffCoefficient: 1.5,
  retryMaxDelayMs: 30000
};

export function loadWithRetry<S, T>(
  source: Observable<S>,
  producer: (key: S) => Observable<T>,
  options?: LoadWithRetryOptions
): Observable<LoadResult<T>> {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  return source.pipe(switchMap(key => {
    const statusUpdates = new Subject<LoadResult<T>>();
    let attempt = 0;
    return merge(
      of({ status: LoadResultStatus.InProgress }),
      statusUpdates,
      defer(() => {
        attempt++;
        return producer(key);
      })
        .pipe(retryWhen(errors => errors.pipe(
          tap(error =>
            statusUpdates.next({
              status: LoadResultStatus.Error,
              error,
              willRetry: attempt < options.attempts
            })),
          filter(_ => attempt < options.attempts),
          tap(_ => statusUpdates.next({ status: LoadResultStatus.Waiting })),
          delayWhen(() => retryDelay(options, attempt)),
          tap(_ => statusUpdates.next({ status: LoadResultStatus.Retrying }))
        )),
          map((data: T) => ({ status: LoadResultStatus.Success, data })))
    );
  }));
}

function retryDelay(options: LoadWithRetryOptions, attempt: number): Observable<any> {
  const jitter = (Math.random() - .5) * options.retryDelayMs * .5;
  let delay = options.retryDelayMs * Math.pow(options.retryBackoffCoefficient, attempt - 1) + jitter;
  delay = Math.min(delay, options.retryMaxDelayMs);
  return timer(delay);
}
