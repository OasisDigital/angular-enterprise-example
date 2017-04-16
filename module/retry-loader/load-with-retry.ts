import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeLast';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delayWhen';

export enum ILoadResultStatus {
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

export interface ILoadResult<T> {
  status: ILoadResultStatus;
  data?: T;
  error?: any;
  willRetry?: boolean;
}

export interface ILoadWithRetryOptions {
  // To retry once after failure, use attempts=2
  attempts?: number;
  retryDelayMs?: number;
  retryBackoffCoefficient?: number;
  retryMaxDelayMs?: number;
}

const DEFAULT_OPTIONS: ILoadWithRetryOptions = {
  attempts: 3,
  retryDelayMs: 2000,
  retryBackoffCoefficient: 1.5,
  retryMaxDelayMs: 30000
};

export function loadWithRetry<S, T>(
  source: Observable<S>,
  producer: (key: S) => Observable<T>,
  options?: ILoadWithRetryOptions
): Observable<ILoadResult<T>> {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  return source.switchMap(key => {
    const statusUpdates = new Subject<ILoadResult<T>>();
    let attempt = 0;
    return Observable.merge(
      Observable.of({ status: ILoadResultStatus.InProgress }),
      statusUpdates,
      Observable.defer(() => {
        attempt++;
        return producer(key);
      })
        .retryWhen(errors => errors
          .do(error =>
            statusUpdates.next({
              status: ILoadResultStatus.Error,
              error,
              willRetry: attempt < options.attempts
            }))
          .filter(_ => attempt < options.attempts)
          .do(_ => statusUpdates.next({ status: ILoadResultStatus.Waiting }))
          .delayWhen(() => retryDelay(options, attempt))
          .do(_ => statusUpdates.next({ status: ILoadResultStatus.Retrying }))
        )
        .map((data: T) => ({ status: ILoadResultStatus.Success, data }))
    );
  });
}

function retryDelay(options: ILoadWithRetryOptions, attempt: number): Observable<any> {
  const jitter = (Math.random() - .5) * options.retryDelayMs * .5;
  let delay = options.retryDelayMs * Math.pow(options.retryBackoffCoefficient, attempt - 1) + jitter;
  delay = Math.min(delay, options.retryMaxDelayMs);
  return Observable.timer(delay);
}
