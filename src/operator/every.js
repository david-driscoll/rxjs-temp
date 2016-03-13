System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var EveryOperator, EverySubscriber;
    function every(predicate, thisArg) {
        const source = this;
        return source.lift(new EveryOperator(predicate, thisArg, source));
    }
    exports_1("every", every);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class EveryOperator {
                constructor(predicate, thisArg, source) {
                    this.predicate = predicate;
                    this.thisArg = thisArg;
                    this.source = source;
                }
                call(observer) {
                    return new EverySubscriber(observer, this.predicate, this.thisArg, this.source);
                }
            }
            class EverySubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate, thisArg, source) {
                    super(destination);
                    this.predicate = predicate;
                    this.thisArg = thisArg;
                    this.source = source;
                    this.index = 0;
                    this.thisArg = thisArg || this;
                }
                notifyComplete(everyValueMatch) {
                    this.destination.next(everyValueMatch);
                    this.destination.complete();
                }
                _next(value) {
                    let result = false;
                    try {
                        result = this.predicate.call(this.thisArg, value, this.index++, this.source);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    if (!result) {
                        this.notifyComplete(false);
                    }
                }
                _complete() {
                    this.notifyComplete(true);
                }
            }
        }
    }
});
