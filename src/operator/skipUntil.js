System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var SkipUntilOperator, SkipUntilSubscriber;
    function skipUntil(notifier) {
        return this.lift(new SkipUntilOperator(notifier));
    }
    exports_1("skipUntil", skipUntil);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class SkipUntilOperator {
                constructor(notifier) {
                    this.notifier = notifier;
                }
                call(subscriber) {
                    return new SkipUntilSubscriber(subscriber, this.notifier);
                }
            }
            class SkipUntilSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, notifier) {
                    super(destination);
                    this.hasValue = false;
                    this.isInnerStopped = false;
                    this.add(subscribeToResult_1.subscribeToResult(this, notifier));
                }
                _next(value) {
                    if (this.hasValue) {
                        super._next(value);
                    }
                }
                _complete() {
                    if (this.isInnerStopped) {
                        super._complete();
                    }
                    else {
                        this.unsubscribe();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.hasValue = true;
                }
                notifyComplete() {
                    this.isInnerStopped = true;
                    if (this.isStopped) {
                        super._complete();
                    }
                }
            }
        }
    }
});
