System.register(['../Observable', './ScalarObservable', './EmptyObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, ScalarObservable_1, EmptyObservable_1;
    var ArrayLikeObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (ScalarObservable_1_1) {
                ScalarObservable_1 = ScalarObservable_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            }],
        execute: function() {
            class ArrayLikeObservable extends Observable_1.Observable {
                constructor(arrayLike, mapFn, thisArg, scheduler) {
                    super();
                    this.arrayLike = arrayLike;
                    this.scheduler = scheduler;
                    if (!mapFn && !scheduler && arrayLike.length === 1) {
                        this._isScalar = true;
                        this.value = arrayLike[0];
                    }
                    if (mapFn) {
                        this.mapFn = mapFn.bind(thisArg);
                    }
                }
                static create(arrayLike, mapFn, thisArg, scheduler) {
                    const length = arrayLike.length;
                    if (length === 0) {
                        return new EmptyObservable_1.EmptyObservable();
                    }
                    else if (length === 1 && !mapFn) {
                        return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
                    }
                    else {
                        return new ArrayLikeObservable(arrayLike, mapFn, thisArg, scheduler);
                    }
                }
                static dispatch(state) {
                    const { arrayLike, index, length, mapFn, subscriber } = state;
                    if (subscriber.isUnsubscribed) {
                        return;
                    }
                    if (index >= length) {
                        subscriber.complete();
                        return;
                    }
                    const result = mapFn ? mapFn(arrayLike[index], index) : arrayLike[index];
                    subscriber.next(result);
                    state.index = index + 1;
                    this.schedule(state);
                }
                _subscribe(subscriber) {
                    let index = 0;
                    const { arrayLike, mapFn, scheduler } = this;
                    const length = arrayLike.length;
                    if (scheduler) {
                        return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                            arrayLike: arrayLike, index: index, length: length, mapFn: mapFn, subscriber: subscriber
                        });
                    }
                    else {
                        for (let i = 0; i < length && !subscriber.isUnsubscribed; i++) {
                            const result = mapFn ? mapFn(arrayLike[i], i) : arrayLike[i];
                            subscriber.next(result);
                        }
                        subscriber.complete();
                    }
                }
            }
            exports_1("ArrayLikeObservable", ArrayLikeObservable);
        }
    }
});
