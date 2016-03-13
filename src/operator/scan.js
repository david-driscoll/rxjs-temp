System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var ScanOperator, ScanSubscriber;
    function scan(accumulator, seed) {
        return this.lift(new ScanOperator(accumulator, seed));
    }
    exports_1("scan", scan);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class ScanOperator {
                constructor(accumulator, seed) {
                    this.accumulator = accumulator;
                    this.seed = seed;
                }
                call(subscriber) {
                    return new ScanSubscriber(subscriber, this.accumulator, this.seed);
                }
            }
            class ScanSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, accumulator, seed) {
                    super(destination);
                    this.accumulator = accumulator;
                    this.accumulatorSet = false;
                    this.seed = seed;
                    this.accumulator = accumulator;
                    this.accumulatorSet = typeof seed !== 'undefined';
                }
                get seed() {
                    return this._seed;
                }
                set seed(value) {
                    this.accumulatorSet = true;
                    this._seed = value;
                }
                _next(value) {
                    if (!this.accumulatorSet) {
                        this.seed = value;
                        this.destination.next(value);
                    }
                    else {
                        return this._tryNext(value);
                    }
                }
                _tryNext(value) {
                    let result;
                    try {
                        result = this.accumulator(this.seed, value);
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                    this.seed = result;
                    this.destination.next(result);
                }
            }
        }
    }
});
