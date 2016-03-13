System.register(['../Observable', './ScalarObservable', './EmptyObservable', '../util/isScheduler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, ScalarObservable_1, EmptyObservable_1, isScheduler_1;
    var ArrayObservable;
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
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }],
        execute: function() {
            class ArrayObservable extends Observable_1.Observable {
                constructor(array, scheduler) {
                    super();
                    this.array = array;
                    this.scheduler = scheduler;
                    if (!scheduler && array.length === 1) {
                        this._isScalar = true;
                        this.value = array[0];
                    }
                }
                static create(array, scheduler) {
                    return new ArrayObservable(array, scheduler);
                }
                static of(...array) {
                    let scheduler = array[array.length - 1];
                    if (isScheduler_1.isScheduler(scheduler)) {
                        array.pop();
                    }
                    else {
                        scheduler = null;
                    }
                    const len = array.length;
                    if (len > 1) {
                        return new ArrayObservable(array, scheduler);
                    }
                    else if (len === 1) {
                        return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
                    }
                    else {
                        return new EmptyObservable_1.EmptyObservable(scheduler);
                    }
                }
                static dispatch(state) {
                    const { array, index, count, subscriber } = state;
                    if (index >= count) {
                        subscriber.complete();
                        return;
                    }
                    subscriber.next(array[index]);
                    if (subscriber.isUnsubscribed) {
                        return;
                    }
                    state.index = index + 1;
                    this.schedule(state);
                }
                _subscribe(subscriber) {
                    let index = 0;
                    const array = this.array;
                    const count = array.length;
                    const scheduler = this.scheduler;
                    if (scheduler) {
                        return scheduler.schedule(ArrayObservable.dispatch, 0, {
                            array: array, index: index, count: count, subscriber: subscriber
                        });
                    }
                    else {
                        for (let i = 0; i < count && !subscriber.isUnsubscribed; i++) {
                            subscriber.next(array[i]);
                        }
                        subscriber.complete();
                    }
                }
            }
            exports_1("ArrayObservable", ArrayObservable);
        }
    }
});
