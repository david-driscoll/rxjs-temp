System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var MergeMapToOperator, MergeMapToSubscriber;
    function mergeMapTo(observable, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
        return this.lift(new MergeMapToOperator(observable, resultSelector, concurrent));
    }
    exports_1("mergeMapTo", mergeMapTo);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class MergeMapToOperator {
                constructor(ish, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
                    this.ish = ish;
                    this.resultSelector = resultSelector;
                    this.concurrent = concurrent;
                }
                call(observer) {
                    return new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent);
                }
            }
            exports_1("MergeMapToOperator", MergeMapToOperator);
            class MergeMapToSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, ish, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
                    super(destination);
                    this.ish = ish;
                    this.resultSelector = resultSelector;
                    this.concurrent = concurrent;
                    this.hasCompleted = false;
                    this.buffer = [];
                    this.active = 0;
                    this.index = 0;
                }
                _next(value) {
                    if (this.active < this.concurrent) {
                        const resultSelector = this.resultSelector;
                        const index = this.index++;
                        const ish = this.ish;
                        const destination = this.destination;
                        this.active++;
                        this._innerSub(ish, destination, resultSelector, value, index);
                    }
                    else {
                        this.buffer.push(value);
                    }
                }
                _innerSub(ish, destination, resultSelector, value, index) {
                    this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
                }
                _complete() {
                    this.hasCompleted = true;
                    if (this.active === 0 && this.buffer.length === 0) {
                        this.destination.complete();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    const { resultSelector, destination } = this;
                    if (resultSelector) {
                        this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
                    }
                    else {
                        destination.next(innerValue);
                    }
                }
                trySelectResult(outerValue, innerValue, outerIndex, innerIndex) {
                    const { resultSelector, destination } = this;
                    let result;
                    try {
                        result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
                    }
                    catch (err) {
                        destination.error(err);
                        return;
                    }
                    destination.next(result);
                }
                notifyError(err) {
                    this.destination.error(err);
                }
                notifyComplete(innerSub) {
                    const buffer = this.buffer;
                    this.remove(innerSub);
                    this.active--;
                    if (buffer.length > 0) {
                        this._next(buffer.shift());
                    }
                    else if (this.active === 0 && this.hasCompleted) {
                        this.destination.complete();
                    }
                }
            }
            exports_1("MergeMapToSubscriber", MergeMapToSubscriber);
        }
    }
});
