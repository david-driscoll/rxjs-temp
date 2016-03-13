System.register(['./Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var Operator;
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class Operator {
                call(subscriber) {
                    return new Subscriber_1.Subscriber(subscriber);
                }
            }
            exports_1("Operator", Operator);
        }
    }
});
