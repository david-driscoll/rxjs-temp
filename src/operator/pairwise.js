System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var PairwiseOperator, PairwiseSubscriber;
    function pairwise() {
        return this.lift(new PairwiseOperator());
    }
    exports_1("pairwise", pairwise);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class PairwiseOperator {
                call(subscriber) {
                    return new PairwiseSubscriber(subscriber);
                }
            }
            class PairwiseSubscriber extends Subscriber_1.Subscriber {
                constructor(destination) {
                    super(destination);
                    this.hasPrev = false;
                }
                _next(value) {
                    if (this.hasPrev) {
                        this.destination.next([this.prev, value]);
                    }
                    else {
                        this.hasPrev = true;
                    }
                    this.prev = value;
                }
            }
        }
    }
});
