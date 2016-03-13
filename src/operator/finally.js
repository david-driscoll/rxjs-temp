System.register(['../Subscriber', '../Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, Subscription_1;
    var FinallyOperator, FinallySubscriber;
    function _finally(finallySelector) {
        return this.lift(new FinallyOperator(finallySelector));
    }
    exports_1("_finally", _finally);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }],
        execute: function() {
            class FinallyOperator {
                constructor(finallySelector) {
                    this.finallySelector = finallySelector;
                }
                call(subscriber) {
                    return new FinallySubscriber(subscriber, this.finallySelector);
                }
            }
            class FinallySubscriber extends Subscriber_1.Subscriber {
                constructor(destination, finallySelector) {
                    super(destination);
                    this.add(new Subscription_1.Subscription(finallySelector));
                }
            }
        }
    }
});
