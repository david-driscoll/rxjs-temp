System.register(['../Subscriber', '../util/ArgumentOutOfRangeError', '../observable/EmptyObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, ArgumentOutOfRangeError_1, EmptyObservable_1;
    var TakeLastOperator, TakeLastSubscriber;
    function takeLast(total) {
        if (total === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else {
            return this.lift(new TakeLastOperator(total));
        }
    }
    exports_1("takeLast", takeLast);
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
            class TakeLastOperator {
                constructor(total) {
                    this.total = total;
                    if (this.total < 0) {
                        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
                    }
                }
                call(subscriber) {
                    return new TakeLastSubscriber(subscriber, this.total);
                }
            }
            class TakeLastSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, total) {
                    super(destination);
                    this.total = total;
                    this.ring = new Array();
                    this.count = 0;
                }
                _next(value) {
                    const ring = this.ring;
                    const total = this.total;
                    const count = this.count++;
                    if (ring.length < total) {
                        ring.push(value);
                    }
                    else {
                        const index = count % total;
                        ring[index] = value;
                    }
                }
                _complete() {
                    const destination = this.destination;
                    let count = this.count;
                    if (count > 0) {
                        const total = this.count >= this.total ? this.total : this.count;
                        const ring = this.ring;
                        for (let i = 0; i < total; i++) {
                            const idx = (count++) % total;
                            destination.next(ring[idx]);
                        }
                    }
                    destination.complete();
                }
            }
        }
    }
});
