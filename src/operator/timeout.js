System.register(['../scheduler/async', '../util/isDate', '../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_1, isDate_1, Subscriber_1;
    var TimeoutOperator, TimeoutSubscriber;
    function timeout(due, errorToSend = null, scheduler = async_1.async) {
        let absoluteTimeout = isDate_1.isDate(due);
        let waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
        return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler));
    }
    exports_1("timeout", timeout);
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (isDate_1_1) {
                isDate_1 = isDate_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class TimeoutOperator {
                constructor(waitFor, absoluteTimeout, errorToSend, scheduler) {
                    this.waitFor = waitFor;
                    this.absoluteTimeout = absoluteTimeout;
                    this.errorToSend = errorToSend;
                    this.scheduler = scheduler;
                }
                call(subscriber) {
                    return new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.errorToSend, this.scheduler);
                }
            }
            class TimeoutSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, absoluteTimeout, waitFor, errorToSend, scheduler) {
                    super(destination);
                    this.absoluteTimeout = absoluteTimeout;
                    this.waitFor = waitFor;
                    this.errorToSend = errorToSend;
                    this.scheduler = scheduler;
                    this.index = 0;
                    this._previousIndex = 0;
                    this._hasCompleted = false;
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
                        source.notifyTimeout();
                    }
                }
                scheduleTimeout() {
                    let currentIndex = this.index;
                    this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, { subscriber: this, index: currentIndex });
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
                notifyTimeout() {
                    this.error(this.errorToSend || new Error('timeout'));
                }
            }
        }
    }
});
