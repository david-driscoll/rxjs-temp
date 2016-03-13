System.register(['../scheduler/async', '../util/isDate', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_1, isDate_1, OuterSubscriber_1, subscribeToResult_1;
    var TimeoutWithOperator, TimeoutWithSubscriber;
    function timeoutWith(due, withObservable, scheduler = async_1.async) {
        let absoluteTimeout = isDate_1.isDate(due);
        let waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
        return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
    }
    exports_1("timeoutWith", timeoutWith);
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (isDate_1_1) {
                isDate_1 = isDate_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class TimeoutWithOperator {
                constructor(waitFor, absoluteTimeout, withObservable, scheduler) {
                    this.waitFor = waitFor;
                    this.absoluteTimeout = absoluteTimeout;
                    this.withObservable = withObservable;
                    this.scheduler = scheduler;
                }
                call(subscriber) {
                    return new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler);
                }
            }
            class TimeoutWithSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
                    super();
                    this.destination = destination;
                    this.absoluteTimeout = absoluteTimeout;
                    this.waitFor = waitFor;
                    this.withObservable = withObservable;
                    this.scheduler = scheduler;
                    this.timeoutSubscription = undefined;
                    this.index = 0;
                    this._previousIndex = 0;
                    this._hasCompleted = false;
                    destination.add(this);
                    this.scheduleTimeout();
                }
                get previousIndex() {
                    return this._previousIndex;
                }
                get hasCompleted() {
                    return this._hasCompleted;
                }
                static dispatchTimeout(state) {
                    const source = state.subscriber;
                    const currentIndex = state.index;
                    if (!source.hasCompleted && source.previousIndex === currentIndex) {
                        source.handleTimeout();
                    }
                }
                scheduleTimeout() {
                    let currentIndex = this.index;
                    const timeoutState = { subscriber: this, index: currentIndex };
                    this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
                    this.index++;
                    this._previousIndex = currentIndex;
                }
                _next(value) {
                    this.destination.next(value);
                    if (!this.absoluteTimeout) {
                        this.scheduleTimeout();
                    }
                }
                _error(err) {
                    this.destination.error(err);
                    this._hasCompleted = true;
                }
                _complete() {
                    this.destination.complete();
                    this._hasCompleted = true;
                }
                handleTimeout() {
                    if (!this.isUnsubscribed) {
                        const withObservable = this.withObservable;
                        this.unsubscribe();
                        this.destination.add(this.timeoutSubscription = subscribeToResult_1.subscribeToResult(this, withObservable));
                    }
                }
            }
        }
    }
});
