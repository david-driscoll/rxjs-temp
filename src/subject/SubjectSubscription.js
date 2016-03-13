System.register(['../Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscription_1;
    var SubjectSubscription;
    return {
        setters:[
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }],
        execute: function() {
            class SubjectSubscription extends Subscription_1.Subscription {
                constructor(subject, observer) {
                    super();
                    this.subject = subject;
                    this.observer = observer;
                    this.isUnsubscribed = false;
                }
                unsubscribe() {
                    if (this.isUnsubscribed) {
                        return;
                    }
                    this.isUnsubscribed = true;
                    const subject = this.subject;
                    const observers = subject.observers;
                    this.subject = null;
                    if (!observers || observers.length === 0 || subject.isUnsubscribed) {
                        return;
                    }
                    const subscriberIndex = observers.indexOf(this.observer);
                    if (subscriberIndex !== -1) {
                        observers.splice(subscriberIndex, 1);
                    }
                }
            }
            exports_1("SubjectSubscription", SubjectSubscription);
        }
    }
});
