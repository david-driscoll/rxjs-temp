System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var SwitchMapToOperator, SwitchMapToSubscriber;
    function switchMapTo(observable, resultSelector) {
        return this.lift(new SwitchMapToOperator(observable, resultSelector));
    }
    exports_1("switchMapTo", switchMapTo);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class SwitchMapToOperator {
                constructor(observable, resultSelector) {
                    this.observable = observable;
                    this.resultSelector = resultSelector;
                }
                call(subscriber) {
                    return new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector);
                }
            }
            class SwitchMapToSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, inner, resultSelector) {
                    super(destination);
                    this.inner = inner;
                    this.resultSelector = resultSelector;
                    this.index = 0;
                }
                _next(value) {
                    const innerSubscription = this.innerSubscription;
                    if (innerSubscription) {
                        innerSubscription.unsubscribe();
                    }
                    this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, this.inner, value, this.index++));
                }
                _complete() {
                    const { innerSubscription } = this;
                    if (!innerSubscription || innerSubscription.isUnsubscribed) {
                        super._complete();
                    }
                }
                _unsubscribe() {
                    this.innerSubscription = null;
                }
                notifyComplete(innerSub) {
                    this.remove(innerSub);
                    this.innerSubscription = null;
                    if (this.isStopped) {
                        super._complete();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    const { resultSelector, destination } = this;
                    if (resultSelector) {
                        this.tryResultSelector(outerValue, innerValue, outerIndex, innerIndex);
                    }
                    else {
                        destination.next(innerValue);
                    }
                }
                tryResultSelector(outerValue, innerValue, outerIndex, innerIndex) {
                    const { resultSelector, destination } = this;
                    let result;
                    try {
                        result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
                    }
                    catch (err) {
                        destination.error(err);
                        return;
                    }
                    destination.next(result);
                }
            }
        }
    }
});
