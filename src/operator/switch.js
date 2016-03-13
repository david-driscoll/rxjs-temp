System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var SwitchOperator, SwitchSubscriber;
    function _switch() {
        return this.lift(new SwitchOperator());
    }
    exports_1("_switch", _switch);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class SwitchOperator {
                call(subscriber) {
                    return new SwitchSubscriber(subscriber);
                }
            }
            class SwitchSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination) {
                    super(destination);
                    this.active = 0;
                    this.hasCompleted = false;
                }
                _next(value) {
                    this.unsubscribeInner();
                    this.active++;
                    this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, value));
                }
                _complete() {
                    this.hasCompleted = true;
                    if (this.active === 0) {
                        this.destination.complete();
                    }
                }
                unsubscribeInner() {
                    this.active = this.active > 0 ? this.active - 1 : 0;
                    const innerSubscription = this.innerSubscription;
                    if (innerSubscription) {
                        innerSubscription.unsubscribe();
                        this.remove(innerSubscription);
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.destination.next(innerValue);
                }
                notifyError(err) {
                    this.destination.error(err);
                }
                notifyComplete() {
                    this.unsubscribeInner();
                    if (this.hasCompleted && this.active === 0) {
                        this.destination.complete();
                    }
                }
            }
        }
    }
});
