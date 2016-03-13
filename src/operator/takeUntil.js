System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var TakeUntilOperator, TakeUntilSubscriber;
    function takeUntil(notifier) {
        return this.lift(new TakeUntilOperator(notifier));
    }
    exports_1("takeUntil", takeUntil);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class TakeUntilOperator {
                constructor(notifier) {
                    this.notifier = notifier;
                }
                call(subscriber) {
                    return new TakeUntilSubscriber(subscriber, this.notifier);
                }
            }
            class TakeUntilSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, notifier) {
                    super(destination);
                    this.notifier = notifier;
                    this.add(subscribeToResult_1.subscribeToResult(this, notifier));
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.complete();
                }
                notifyComplete() {
                }
            }
        }
    }
});
