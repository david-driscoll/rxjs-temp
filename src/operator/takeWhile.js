System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var TakeWhileOperator, TakeWhileSubscriber;
    function takeWhile(predicate) {
        return this.lift(new TakeWhileOperator(predicate));
    }
    exports_1("takeWhile", takeWhile);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class TakeWhileOperator {
                constructor(predicate) {
                    this.predicate = predicate;
                }
                call(subscriber) {
                    return new TakeWhileSubscriber(subscriber, this.predicate);
                }
            }
            class TakeWhileSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate) {
                    super(destination);
                    this.predicate = predicate;
                    this.index = 0;
                }
                _next(value) {
                    const destination = this.destination;
                    let result;
                    try {
                        result = this.predicate(value, this.index++);
                    }
                    catch (err) {
                        destination.error(err);
                        return;
                    }
                    this.nextOrComplete(value, result);
                }
                nextOrComplete(value, predicateResult) {
                    const destination = this.destination;
                    if (Boolean(predicateResult)) {
                        destination.next(value);
                    }
                    else {
                        destination.complete();
                    }
                }
            }
        }
    }
});
