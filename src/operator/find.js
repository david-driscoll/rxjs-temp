System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var FindValueOperator, FindValueSubscriber;
    function find(predicate, thisArg) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate is not a function');
        }
        return this.lift(new FindValueOperator(predicate, this, false, thisArg));
    }
    exports_1("find", find);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class FindValueOperator {
                constructor(predicate, source, yieldIndex, thisArg) {
                    this.predicate = predicate;
                    this.source = source;
                    this.yieldIndex = yieldIndex;
                    this.thisArg = thisArg;
                }
                call(observer) {
                    return new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg);
                }
            }
            exports_1("FindValueOperator", FindValueOperator);
            class FindValueSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate, source, yieldIndex, thisArg) {
                    super(destination);
                    this.predicate = predicate;
                    this.source = source;
                    this.yieldIndex = yieldIndex;
                    this.thisArg = thisArg;
                    this.index = 0;
                }
                notifyComplete(value) {
                    const destination = this.destination;
                    destination.next(value);
                    destination.complete();
                }
                _next(value) {
                    const { predicate, thisArg } = this;
                    const index = this.index++;
                    try {
                        const result = predicate.call(thisArg || this, value, index, this.source);
                        if (result) {
                            this.notifyComplete(this.yieldIndex ? index : value);
                        }
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                }
                _complete() {
                    this.notifyComplete(this.yieldIndex ? -1 : undefined);
                }
            }
            exports_1("FindValueSubscriber", FindValueSubscriber);
        }
    }
});
