System.register(['../Subject', '../Subscription', './SubscriptionLoggable', '../util/applyMixins'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, Subscription_1, SubscriptionLoggable_1, applyMixins_1;
    var HotObservable;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
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
            class HotObservable extends Subject_1.Subject {
                constructor(messages, scheduler) {
                    super();
                    this.messages = messages;
                    this.subscriptions = [];
                    this.scheduler = scheduler;
                }
                _subscribe(subscriber) {
                    const subject = this;
                    const index = subject.logSubscribedFrame();
                    subscriber.add(new Subscription_1.Subscription(() => {
                        subject.logUnsubscribedFrame(index);
                    }));
                    return super._subscribe(subscriber);
                }
                setup() {
                    const subject = this;
                    const messagesLength = subject.messages.length;
                    for (var i = 0; i < messagesLength; i++) {
                        (() => {
                            var message = subject.messages[i];
                            subject.scheduler.schedule(() => { message.notification.observe(subject); }, message.frame);
                        })();
                    }
                }
            }
            exports_1("HotObservable", HotObservable);
            applyMixins_1.applyMixins(HotObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
        }
    }
});
