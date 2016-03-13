System.register(['../Subscriber', '../scheduler/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, async_1;
    var ThrottleTimeOperator, ThrottleTimeSubscriber;
    function throttleTime(delay, scheduler = async_1.async) {
        return this.lift(new ThrottleTimeOperator(delay, scheduler));
    }
    exports_1("throttleTime", throttleTime);
    function dispatchNext({ subscriber }) {
        subscriber.clearThrottle();
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
            class ThrottleTimeOperator {
                constructor(delay, scheduler) {
                    this.delay = delay;
                    this.scheduler = scheduler;
                }
                call(subscriber) {
                    return new ThrottleTimeSubscriber(subscriber, this.delay, this.scheduler);
                }
            }
            class ThrottleTimeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, delay, scheduler) {
                    super(destination);
                    this.delay = delay;
                    this.scheduler = scheduler;
                }
                _next(value) {
                    if (!this.throttled) {
                        this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, { subscriber: this }));
                        this.destination.next(value);
                    }
                }
                clearThrottle() {
                    const throttled = this.throttled;
                    if (throttled) {
                        throttled.unsubscribe();
                        this.remove(throttled);
                        this.throttled = null;
                    }
                }
            }
        }
    }
});
