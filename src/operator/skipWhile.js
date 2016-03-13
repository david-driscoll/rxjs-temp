System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var SkipWhileOperator, SkipWhileSubscriber;
    function skipWhile(predicate) {
        return this.lift(new SkipWhileOperator(predicate));
    }
    exports_1("skipWhile", skipWhile);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class SkipWhileOperator {
                constructor(predicate) {
                    this.predicate = predicate;
                }
                call(subscriber) {
                    return new SkipWhileSubscriber(subscriber, this.predicate);
                }
            }
            class SkipWhileSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate) {
                    super(destination);
                    this.predicate = predicate;
                    this.skipping = true;
                    this.index = 0;
                }
                _next(value) {
                    const destination = this.destination;
                    if (this.skipping) {
                        this.tryCallPredicate(value);
                    }
                    if (!this.skipping) {
                        destination.next(value);
                    }
                }
                tryCallPredicate(value) {
                    try {
                        const result = this.predicate(value, this.index++);
                        this.skipping = Boolean(result);
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                }
            }
        }
    }
});
