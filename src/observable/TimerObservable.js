System.register(['../util/isNumeric', '../Observable', '../scheduler/async', '../util/isScheduler', '../util/isDate'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isNumeric_1, Observable_1, async_1, isScheduler_1, isDate_1;
    var TimerObservable;
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
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            },
            function (isDate_1_1) {
                isDate_1 = isDate_1_1;
            }],
        execute: function() {
            class TimerObservable extends Observable_1.Observable {
                constructor(dueTime = 0, period, scheduler) {
                    super();
                    this.period = -1;
                    this.dueTime = 0;
                    if (isNumeric_1.isNumeric(period)) {
                        this.period = Number(period) < 1 && 1 || Number(period);
                    }
                    else if (isScheduler_1.isScheduler(period)) {
                        scheduler = period;
                    }
                    if (!isScheduler_1.isScheduler(scheduler)) {
                        scheduler = async_1.async;
                    }
                    this.scheduler = scheduler;
                    this.dueTime = isDate_1.isDate(dueTime) ?
                        (+dueTime - this.scheduler.now()) :
                        dueTime;
                }
                static create(dueTime = 0, period, scheduler) {
                    return new TimerObservable(dueTime, period, scheduler);
                }
                static dispatch(state) {
                    const { index, period, subscriber } = state;
                    const action = this;
                    subscriber.next(index);
                    if (subscriber.isUnsubscribed) {
                        return;
                    }
                    else if (period === -1) {
                        return subscriber.complete();
                    }
                    state.index = index + 1;
                    action.schedule(state, period);
                }
                _subscribe(subscriber) {
                    const index = 0;
                    const { period, dueTime, scheduler } = this;
                    return scheduler.schedule(TimerObservable.dispatch, dueTime, {
                        index: index, period: period, subscriber: subscriber
                    });
                }
            }
            exports_1("TimerObservable", TimerObservable);
        }
    }
});
