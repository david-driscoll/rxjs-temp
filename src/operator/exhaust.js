System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var SwitchFirstOperator, SwitchFirstSubscriber;
    function exhaust() {
        return this.lift(new SwitchFirstOperator());
    }
    exports_1("exhaust", exhaust);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class SwitchFirstOperator {
                call(subscriber) {
                    return new SwitchFirstSubscriber(subscriber);
                }
            }
            class SwitchFirstSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination) {
                    super(destination);
                    this.hasCompleted = false;
                    this.hasSubscription = false;
                }
                _next(value) {
                    if (!this.hasSubscription) {
                        this.hasSubscription = true;
                        this.add(subscribeToResult_1.subscribeToResult(this, value));
                    }
                }
                _complete() {
                    this.hasCompleted = true;
                    if (!this.hasSubscription) {
                        this.destination.complete();
                    }
                }
                notifyComplete(innerSub) {
                    this.remove(innerSub);
                    this.hasSubscription = false;
                    if (this.hasCompleted) {
                        this.destination.complete();
                    }
                }
            }
        }
    }
});
