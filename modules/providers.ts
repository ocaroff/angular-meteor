'use strict';

import {
  Provider,
  ChangeDetectorRef,
  IterableDiffers,
  DefaultIterableDiffer,
  IterableDifferFactory,
  TrackByFunction
} from '@angular/core';

import {MongoCursorDifferFactory} from './mongo_cursor_differ';

import {isListLikeIterable} from './utils';

export class DefaultIterableDifferFactory implements IterableDifferFactory {
  constructor() {}
  supports(obj: Object): boolean { return isListLikeIterable(obj); }
  create<V>(_cdr?: ChangeDetectorRef | TrackByFunction<V>, trackByFn?: TrackByFunction<V>): DefaultIterableDiffer<V> {
    return new DefaultIterableDiffer(trackByFn);
  }
}

function meteorProviders() {
  return [
    {
      provide: IterableDiffers,
      useFactory: () => new IterableDiffers([
        new DefaultIterableDifferFactory(),
        new MongoCursorDifferFactory()
      ])
    }
  ];
}

export const METEOR_PROVIDERS: Array<Provider> = meteorProviders();

