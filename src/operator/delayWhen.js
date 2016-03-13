System.register(['../Subscriber', '../Observable', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, Observable_1, OuterSubscriber_1, subscribeToResult_1;
    var DelayWhenOperator, DelayWhenSubscriber, SubscriptionDelayObservable, SubscriptionDelaySubscriber;
    function delayWhen(delayDurationSelector, subscriptionDelay) {
        if (subscriptionDelay) {
            return new SubscriptionDelayObservable(this, subscriptionDelay)
                .lift(new DelayWhenOperator(delayDurationSelector));
        }
        return this.lift(new DelayWhenOperator(delayDurationSelector));
    }
    exports_1("delayWhen", delayWhen);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class DelayWhenOperator {
                constructor(delayDurationSelector) {
                    this.delayDurationSelector = delayDurationSelector;
                }
                call(subscriber) {
                    return new DelayWhenSubscriber(subscriber, this.delayDurationSelector);
                }
            }
            class DelayWhenSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, delayDurationSelector) {
                    super(destination);
                    this.delayDurationSelector = delayDurationSelector;
                    this.completed = false;
                    this.delayNotifierSubscriptions = [];
                    this.values = [];
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.destination.next(outerValue);
                    this.removeSubscription(innerSub);
                    this.tryComplete();
                }
                notifyError(error, innerSub) {
                    this._error(error);
                }
                notifyComplete(innerSub) {
                    const value = this.removeSubscription(innerSub);
                    if (value) {
                        this.destination.next(value);
                    }
                    this.tryComplete();
                }
                _next(value) {
                    try {
                        const delayNotifier = this.delayDurationSelector(value);
                        if (delayNotifier) {
                            this.tryDelay(delayNotifier, value);
                        }
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                }
                _complete() {
                    this.completed = true;
                    this.tryComplete();
                }
                removeSubscription(subscription) {
                    subscription.unsubscribe();
                    const subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
                    let value = null;
                    if (subscriptionIdx !== -1) {
                        value = this.values[subscriptionIdx];
                        this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
                        this.values.splice(subscriptionIdx, 1);
                    }
                    return value;
                }
                tryDelay(delayNotifier, value) {
                    const notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
                    this.add(notifierSubscription);
                    this.delayNotifierSubscriptions.push(notifierSubscription);
                    this.values.push(value);
                }
                tryComplete() {
                    if (this.completed && this.delayNotifierSubscriptions.length === 0) {
                        this.destination.complete();
                    }
                }
            }
            class SubscriptionDelayObservable extends Observable_1.Observable {
                constructor(source, subscriptionDelay) {
                    super();
                    this.source = source;
                    this.subscriptionDelay = subscriptionDelay;
                }
                _subscribe(subscriber) {
                    this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
                }
            }
            class SubscriptionDelaySubscriber extends Subscriber_1.Subscriber {
                constructor(parent, source) {
                    super();
                    this.parent = parent;
                    this.source = source;
                    this.sourceSubscribed = false;
                }
                _next(unused) {
                    this.subscribeToSource();
                }
                _error(err) {
                    this.unsubscribe();
                    this.parent.error(err);
                }
                _complete() {
                    this.subscribeToSource();
                }
                subscribeToSource() {
                    if (!this.sourceSubscribed) {
                        this.sourceSubscribed = true;
                        this.unsubscribe();
                        this.source.subscribe(this.parent);
                    }
                }
            }
        }
    }
});
