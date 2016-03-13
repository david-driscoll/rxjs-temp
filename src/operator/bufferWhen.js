System.register(['../Subscription', '../util/tryCatch', '../util/errorObject', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscription_1, tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1;
    var BufferWhenOperator, BufferWhenSubscriber;
    function bufferWhen(closingSelector) {
        return this.lift(new BufferWhenOperator(closingSelector));
    }
    exports_1("bufferWhen", bufferWhen);
    return {
        setters:[
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
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
            class BufferWhenOperator {
                constructor(closingSelector) {
                    this.closingSelector = closingSelector;
                }
                call(subscriber) {
                    return new BufferWhenSubscriber(subscriber, this.closingSelector);
                }
            }
            class BufferWhenSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, closingSelector) {
                    super(destination);
                    this.closingSelector = closingSelector;
                    this.subscribing = false;
                    this.openBuffer();
                }
                _next(value) {
                    this.buffer.push(value);
                }
                _complete() {
                    const buffer = this.buffer;
                    if (buffer) {
                        this.destination.next(buffer);
                    }
                    super._complete();
                }
                _unsubscribe() {
                    this.buffer = null;
                    this.subscribing = false;
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.openBuffer();
                }
                notifyComplete() {
                    if (this.subscribing) {
                        this.complete();
                    }
                    else {
                        this.openBuffer();
                    }
                }
                openBuffer() {
                    let { closingSubscription } = this;
                    if (closingSubscription) {
                        this.remove(closingSubscription);
                        closingSubscription.unsubscribe();
                    }
                    const buffer = this.buffer;
                    if (this.buffer) {
                        this.destination.next(buffer);
                    }
                    this.buffer = [];
                    const closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
                    if (closingNotifier === errorObject_1.errorObject) {
                        this.error(errorObject_1.errorObject.e);
                    }
                    else {
                        closingSubscription = new Subscription_1.Subscription();
                        this.closingSubscription = closingSubscription;
                        this.add(closingSubscription);
                        this.subscribing = true;
                        closingSubscription.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
                        this.subscribing = false;
                    }
                }
            }
        }
    }
});
