System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var SkipOperator, SkipSubscriber;
    function skip(total) {
        return this.lift(new SkipOperator(total));
    }
    exports_1("skip", skip);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class SkipOperator {
                constructor(total) {
                    this.total = total;
                }
                call(subscriber) {
                    return new SkipSubscriber(subscriber, this.total);
                }
            }
            class SkipSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, total) {
                    super(destination);
                    this.total = total;
                    this.count = 0;
                }
                _next(x) {
                    if (++this.count > this.total) {
                        this.destination.next(x);
                    }
                }
            }
        }
    }
});
