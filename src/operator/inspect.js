System.register(['../util/tryCatch', '../util/errorObject', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1;
    var InspectOperator, InspectSubscriber;
    function inspect(durationSelector) {
        return this.lift(new InspectOperator(durationSelector));
    }
    exports_1("inspect", inspect);
    return {
        setters:[
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class InspectOperator {
                constructor(durationSelector) {
                    this.durationSelector = durationSelector;
                }
                call(subscriber) {
                    return new InspectSubscriber(subscriber, this.durationSelector);
                }
            }
            class InspectSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, durationSelector) {
                    super(destination);
                    this.durationSelector = durationSelector;
                    this.hasValue = false;
                }
                _next(value) {
                    this.value = value;
                    this.hasValue = true;
                    if (!this.throttled) {
                        const duration = tryCatch_1.tryCatch(this.durationSelector)(value);
                        if (duration === errorObject_1.errorObject) {
                            this.destination.error(errorObject_1.errorObject.e);
                        }
                        else {
                            this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
                        }
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
                notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
                    this.clearThrottle();
                }
                notifyComplete() {
                    this.clearThrottle();
                }
            }
        }
    }
});
