System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var DeMaterializeOperator, DeMaterializeSubscriber;
    function dematerialize() {
        return this.lift(new DeMaterializeOperator());
    }
    exports_1("dematerialize", dematerialize);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class DeMaterializeOperator {
                call(subscriber) {
                    return new DeMaterializeSubscriber(subscriber);
                }
            }
            class DeMaterializeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination) {
                    super(destination);
                }
                _next(value) {
                    value.observe(this.destination);
                }
            }
        }
    }
});
