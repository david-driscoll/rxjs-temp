System.register(['../Subscriber', '../scheduler/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, async_1;
    var SampleTimeOperator, SampleTimeSubscriber;
    function sampleTime(delay, scheduler = async_1.async) {
        return this.lift(new SampleTimeOperator(delay, scheduler));
    }
    exports_1("sampleTime", sampleTime);
    function dispatchNotification(state) {
        let { subscriber, delay } = state;
        subscriber.notifyNext();
        this.schedule(state, delay);
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
            class SampleTimeOperator {
                constructor(delay, scheduler) {
                    this.delay = delay;
                    this.scheduler = scheduler;
                }
                call(subscriber) {
                    return new SampleTimeSubscriber(subscriber, this.delay, this.scheduler);
                }
            }
            class SampleTimeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, delay, scheduler) {
                    super(destination);
                    this.delay = delay;
                    this.scheduler = scheduler;
                    this.hasValue = false;
                    this.add(scheduler.schedule(dispatchNotification, delay, { subscriber: this, delay: delay }));
                }
                _next(value) {
                    this.lastValue = value;
                    this.hasValue = true;
                }
                notifyNext() {
                    if (this.hasValue) {
                        this.hasValue = false;
                        this.destination.next(this.lastValue);
                    }
                }
            }
        }
    }
});
