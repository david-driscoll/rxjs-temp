System.register(['../Subscriber', '../util/ArgumentOutOfRangeError', '../observable/EmptyObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, ArgumentOutOfRangeError_1, EmptyObservable_1;
    var TakeOperator, TakeSubscriber;
    function take(total) {
        if (total === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else {
            return this.lift(new TakeOperator(total));
        }
    }
    exports_1("take", take);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (ArgumentOutOfRangeError_1_1) {
                ArgumentOutOfRangeError_1 = ArgumentOutOfRangeError_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            }],
        execute: function() {
            class TakeOperator {
                constructor(total) {
                    this.total = total;
                    if (this.total < 0) {
                        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
                    }
                }
                call(subscriber) {
                    return new TakeSubscriber(subscriber, this.total);
                }
            }
            class TakeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, total) {
                    super(destination);
                    this.total = total;
                    this.count = 0;
                }
                _next(value) {
                    const total = this.total;
                    if (++this.count <= total) {
                        this.destination.next(value);
                        if (this.count === total) {
                            this.destination.complete();
                        }
                    }
                }
            }
        }
    }
});
