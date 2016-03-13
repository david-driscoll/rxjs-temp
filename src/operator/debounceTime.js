System.register(['../Subscriber', '../scheduler/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, async_1;
    var DebounceTimeOperator, DebounceTimeSubscriber;
    function debounceTime(dueTime, scheduler = async_1.async) {
        return this.lift(new DebounceTimeOperator(dueTime, scheduler));
    }
    exports_1("debounceTime", debounceTime);
    function dispatchNext(subscriber) {
        subscriber.debouncedNext();
    }
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            class DebounceTimeOperator {
                constructor(dueTime, scheduler) {
                    this.dueTime = dueTime;
                    this.scheduler = scheduler;
                }
                call(subscriber) {
                    return new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler);
                }
            }
            class DebounceTimeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, dueTime, scheduler) {
                    super(destination);
                    this.dueTime = dueTime;
                    this.scheduler = scheduler;
                    this.debouncedSubscription = null;
                    this.lastValue = null;
                    this.hasValue = false;
                }
                _next(value) {
                    this.clearDebounce();
                    this.lastValue = value;
                    this.hasValue = true;
                    this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
                }
                _complete() {
                    this.debouncedNext();
                    this.destination.complete();
                }
                debouncedNext() {
                    this.clearDebounce();
                    if (this.hasValue) {
                        this.destination.next(this.lastValue);
                        this.lastValue = null;
                        this.hasValue = false;
                    }
                }
                clearDebounce() {
                    const debouncedSubscription = this.debouncedSubscription;
                    if (debouncedSubscription !== null) {
                        this.remove(debouncedSubscription);
                        debouncedSubscription.unsubscribe();
                        this.debouncedSubscription = null;
                    }
                }
            }
        }
    }
});
