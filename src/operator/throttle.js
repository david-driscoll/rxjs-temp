System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var ThrottleOperator, ThrottleSubscriber;
    function throttle(durationSelector) {
        return this.lift(new ThrottleOperator(durationSelector));
    }
    exports_1("throttle", throttle);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class ThrottleOperator {
                constructor(durationSelector) {
                    this.durationSelector = durationSelector;
                }
                call(subscriber) {
                    return new ThrottleSubscriber(subscriber, this.durationSelector);
                }
            }
            class ThrottleSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, durationSelector) {
                    super(destination);
                    this.destination = destination;
                    this.durationSelector = durationSelector;
                }
                _next(value) {
                    if (!this.throttled) {
                        this.tryDurationSelector(value);
                    }
                }
                tryDurationSelector(value) {
                    let duration = null;
                    try {
                        duration = this.durationSelector(value);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.emitAndThrottle(value, duration);
                }
                emitAndThrottle(value, duration) {
                    this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
                    this.destination.next(value);
                }
                _unsubscribe() {
                    const throttled = this.throttled;
                    if (throttled) {
                        this.remove(throttled);
                        this.throttled = null;
                        throttled.unsubscribe();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this._unsubscribe();
                }
                notifyComplete() {
                    this._unsubscribe();
                }
            }
        }
    }
});
