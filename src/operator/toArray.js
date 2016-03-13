System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var ToArrayOperator, ToArraySubscriber;
    function toArray() {
        return this.lift(new ToArrayOperator());
    }
    exports_1("toArray", toArray);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class ToArrayOperator {
                call(subscriber) {
                    return new ToArraySubscriber(subscriber);
                }
            }
            class ToArraySubscriber extends Subscriber_1.Subscriber {
                constructor(destination) {
                    super(destination);
                    this.array = [];
                }
                _next(x) {
                    this.array.push(x);
                }
                _complete() {
                    this.destination.next(this.array);
                    this.destination.complete();
                }
            }
        }
    }
});
