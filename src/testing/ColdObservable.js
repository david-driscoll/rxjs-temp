System.register(['../Observable', '../Subscription', './SubscriptionLoggable', '../util/applyMixins'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, Subscription_1, SubscriptionLoggable_1, applyMixins_1;
    var ColdObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (SubscriptionLoggable_1_1) {
                SubscriptionLoggable_1 = SubscriptionLoggable_1_1;
            },
            function (applyMixins_1_1) {
                applyMixins_1 = applyMixins_1_1;
            }],
        execute: function() {
            class ColdObservable extends Observable_1.Observable {
                constructor(messages, scheduler) {
                    super(function (subscriber) {
                        const observable = this;
                        const index = observable.logSubscribedFrame();
                        subscriber.add(new Subscription_1.Subscription(() => {
                            observable.logUnsubscribedFrame(index);
                        }));
                        observable.scheduleMessages(subscriber);
                        return subscriber;
                    });
                    this.messages = messages;
                    this.subscriptions = [];
                    this.scheduler = scheduler;
                }
                scheduleMessages(subscriber) {
                    const messagesLength = this.messages.length;
                    for (let i = 0; i < messagesLength; i++) {
                        const message = this.messages[i];
                        subscriber.add(this.scheduler.schedule(({ message, subscriber }) => { message.notification.observe(subscriber); }, message.frame, { message: message, subscriber: subscriber }));
                    }
                }
            }
            exports_1("ColdObservable", ColdObservable);
            applyMixins_1.applyMixins(ColdObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
        }
    }
});
