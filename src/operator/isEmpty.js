System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var IsEmptyOperator, IsEmptySubscriber;
    function isEmpty() {
        return this.lift(new IsEmptyOperator());
    }
    exports_1("isEmpty", isEmpty);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class IsEmptyOperator {
                call(observer) {
                    return new IsEmptySubscriber(observer);
                }
            }
            class IsEmptySubscriber extends Subscriber_1.Subscriber {
                constructor(destination) {
                    super(destination);
                }
                notifyComplete(isEmpty) {
                    const destination = this.destination;
                    destination.next(isEmpty);
                    destination.complete();
                }
                _next(value) {
                    this.notifyComplete(false);
                }
                _complete() {
                    this.notifyComplete(true);
                }
            }
        }
    }
});
