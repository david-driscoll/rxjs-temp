System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var DistinctOperator, DistinctSubscriber;
    function distinct(compare, flushes) {
        return this.lift(new DistinctOperator(compare, flushes));
    }
    exports_1("distinct", distinct);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class DistinctOperator {
                constructor(compare, flushes) {
                    this.compare = compare;
                    this.flushes = flushes;
                }
                call(subscriber) {
                    return new DistinctSubscriber(subscriber, this.compare, this.flushes);
                }
            }
            class DistinctSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, compare, flushes) {
                    super(destination);
                    this.values = [];
                    if (typeof compare === 'function') {
                        this.compare = compare;
                    }
                    if (flushes) {
                        this.add(subscribeToResult_1.subscribeToResult(this, flushes));
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.values.length = 0;
                }
                notifyError(error, innerSub) {
                    this._error(error);
                }
                _next(value) {
                    let found = false;
                    const values = this.values;
                    const len = values.length;
                    try {
                        for (let i = 0; i < len; i++) {
                            if (this.compare(values[i], value)) {
                                found = true;
                                return;
                            }
                        }
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.values.push(value);
                    this.destination.next(value);
                }
                compare(x, y) {
                    return x === y;
                }
            }
            exports_1("DistinctSubscriber", DistinctSubscriber);
        }
    }
});
