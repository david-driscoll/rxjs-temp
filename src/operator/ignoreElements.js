System.register(['../Subscriber', '../util/noop'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, noop_1;
    var IgnoreElementsOperator, IgnoreElementsSubscriber;
    function ignoreElements() {
        return this.lift(new IgnoreElementsOperator());
    }
    exports_1("ignoreElements", ignoreElements);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (noop_1_1) {
                noop_1 = noop_1_1;
            }],
        execute: function() {
            ;
            class IgnoreElementsOperator {
                call(subscriber) {
                    return new IgnoreElementsSubscriber(subscriber);
                }
            }
            class IgnoreElementsSubscriber extends Subscriber_1.Subscriber {
                _next(unused) {
                    noop_1.noop();
                }
            }
        }
    }
});
