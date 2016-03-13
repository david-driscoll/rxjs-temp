System.register(['../util/isNumeric', '../Observable', '../scheduler/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isNumeric_1, Observable_1, async_1;
    var IntervalObservable;
    return {
        setters:[
            function (isNumeric_1_1) {
                isNumeric_1 = isNumeric_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            class IntervalObservable extends Observable_1.Observable {
                constructor(period = 0, scheduler = async_1.async) {
                    super();
                    this.period = period;
                    this.scheduler = scheduler;
                    if (!isNumeric_1.isNumeric(period) || period < 0) {
                        this.period = 0;
                    }
                    if (!scheduler || typeof scheduler.schedule !== 'function') {
                        this.scheduler = async_1.async;
                    }
                }
                static create(period = 0, scheduler = async_1.async) {
                    return new IntervalObservable(period, scheduler);
                }
                static dispatch(state) {
                    const { index, subscriber, period } = state;
                    subscriber.next(index);
                    if (subscriber.isUnsubscribed) {
                        return;
                    }
                    state.index += 1;
                    this.schedule(state, period);
                }
                _subscribe(subscriber) {
                    const index = 0;
                    const period = this.period;
                    const scheduler = this.scheduler;
                    subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
                        index: index, subscriber: subscriber, period: period
                    }));
                }
            }
            exports_1("IntervalObservable", IntervalObservable);
        }
    }
});
