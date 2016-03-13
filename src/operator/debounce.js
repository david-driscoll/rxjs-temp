System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var DebounceOperator, DebounceSubscriber;
    function debounce(durationSelector) {
        return this.lift(new DebounceOperator(durationSelector));
    }
    exports_1("debounce", debounce);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class DebounceOperator {
                constructor(durationSelector) {
                    this.durationSelector = durationSelector;
                }
                call(subscriber) {
                    return new DebounceSubscriber(subscriber, this.durationSelector);
                }
            }
            class DebounceSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, durationSelector) {
                    super(destination);
                    this.durationSelector = durationSelector;
                    this.hasValue = false;
                    this.durationSubscription = null;
                }
                _next(value) {
                    try {
                        const result = this.durationSelector.call(this, value);
                        if (result) {
                            this._tryNext(value, result);
                        }
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                }
                _complete() {
                    this.emitValue();
                    this.destination.complete();
                }
                _tryNext(value, duration) {
                    let subscription = this.durationSubscription;
                    this.value = value;
                    this.hasValue = true;
                    if (subscription) {
                        subscription.unsubscribe();
                        this.remove(subscription);
                    }
                    subscription = subscribeToResult_1.subscribeToResult(this, duration);
                    if (!subscription.isUnsubscribed) {
                        this.add(this.durationSubscription = subscription);
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.emitValue();
                }
                notifyComplete() {
                    this.emitValue();
                }
                emitValue() {
                    if (this.hasValue) {
                        const value = this.value;
                        const subscription = this.durationSubscription;
                        if (subscription) {
                            this.durationSubscription = null;
                            subscription.unsubscribe();
                            this.remove(subscription);
                        }
                        this.value = null;
                        this.hasValue = false;
                        super._next(value);
                    }
                }
            }
        }
    }
});
