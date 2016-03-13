System.register(['../Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1;
    var RangeObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            class RangeObservable extends Observable_1.Observable {
                constructor(start, end, scheduler) {
                    super();
                    this.start = start;
                    this.end = end;
                    this.scheduler = scheduler;
                }
                static create(start = 0, end = 0, scheduler) {
                    return new RangeObservable(start, end, scheduler);
                }
                static dispatch(state) {
                    const { start, index, end, subscriber } = state;
                    if (index >= end) {
                        subscriber.complete();
                        return;
                    }
                    subscriber.next(start);
                    if (subscriber.isUnsubscribed) {
                        return;
                    }
                    state.index = index + 1;
                    state.start = start + 1;
                    this.schedule(state);
                }
                _subscribe(subscriber) {
                    let index = 0;
                    let start = this.start;
                    const end = this.end;
                    const scheduler = this.scheduler;
                    if (scheduler) {
                        return scheduler.schedule(RangeObservable.dispatch, 0, {
                            index: index, end: end, start: start, subscriber: subscriber
                        });
                    }
                    else {
                        do {
                            if (index++ >= end) {
                                subscriber.complete();
                                break;
                            }
                            subscriber.next(start++);
                            if (subscriber.isUnsubscribed) {
                                break;
                            }
                        } while (true);
                    }
                }
            }
            exports_1("RangeObservable", RangeObservable);
        }
    }
});
