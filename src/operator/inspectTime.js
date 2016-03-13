System.register(['../scheduler/async', '../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_1, Subscriber_1;
    var InspectTimeOperator, InspectTimeSubscriber;
    function inspectTime(delay, scheduler = async_1.async) {
        return this.lift(new InspectTimeOperator(delay, scheduler));
    }
    exports_1("inspectTime", inspectTime);
    function dispatchNext(subscriber) {
        subscriber.clearThrottle();
    }
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class InspectTimeOperator {
                constructor(delay, scheduler) {
                    this.delay = delay;
                    this.scheduler = scheduler;
                }
                call(subscriber) {
                    return new InspectTimeSubscriber(subscriber, this.delay, this.scheduler);
                }
            }
            class InspectTimeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, delay, scheduler) {
                    super(destination);
                    this.delay = delay;
                    this.scheduler = scheduler;
                    this.hasValue = false;
                }
                _next(value) {
                    this.value = value;
                    this.hasValue = true;
                    if (!this.throttled) {
                        this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, this));
                    }
                }
                clearThrottle() {
                    const { value, hasValue, throttled } = this;
                    if (throttled) {
                        this.remove(throttled);
                        this.throttled = null;
                        throttled.unsubscribe();
                    }
                    if (hasValue) {
                        this.value = null;
                        this.hasValue = false;
                        this.destination.next(value);
                    }
                }
            }
        }
    }
});
