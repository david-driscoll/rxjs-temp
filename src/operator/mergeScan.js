System.register(['../util/tryCatch', '../util/errorObject', '../util/subscribeToResult', '../OuterSubscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tryCatch_1, errorObject_1, subscribeToResult_1, OuterSubscriber_1;
    var MergeScanOperator, MergeScanSubscriber;
    function mergeScan(project, seed, concurrent = Number.POSITIVE_INFINITY) {
        return this.lift(new MergeScanOperator(project, seed, concurrent));
    }
    exports_1("mergeScan", mergeScan);
    return {
        setters:[
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            }],
        execute: function() {
            class MergeScanOperator {
                constructor(project, seed, concurrent) {
                    this.project = project;
                    this.seed = seed;
                    this.concurrent = concurrent;
                }
                call(subscriber) {
                    return new MergeScanSubscriber(subscriber, this.project, this.seed, this.concurrent);
                }
            }
            exports_1("MergeScanOperator", MergeScanOperator);
            class MergeScanSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, project, acc, concurrent) {
                    super(destination);
                    this.project = project;
                    this.acc = acc;
                    this.concurrent = concurrent;
                    this.hasValue = false;
                    this.hasCompleted = false;
                    this.buffer = [];
                    this.active = 0;
                    this.index = 0;
                }
                _next(value) {
                    if (this.active < this.concurrent) {
                        const index = this.index++;
                        const ish = tryCatch_1.tryCatch(this.project)(this.acc, value);
                        const destination = this.destination;
                        if (ish === errorObject_1.errorObject) {
                            destination.error(errorObject_1.errorObject.e);
                        }
                        else {
                            this.active++;
                            this._innerSub(ish, value, index);
                        }
                    }
                    else {
                        this.buffer.push(value);
                    }
                }
                _innerSub(ish, value, index) {
                    this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
                }
                _complete() {
                    this.hasCompleted = true;
                    if (this.active === 0 && this.buffer.length === 0) {
                        if (this.hasValue === false) {
                            this.destination.next(this.acc);
                        }
                        this.destination.complete();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    const { destination } = this;
                    this.acc = innerValue;
                    this.hasValue = true;
                    destination.next(innerValue);
                }
                notifyComplete(innerSub) {
                    const buffer = this.buffer;
                    this.remove(innerSub);
                    this.active--;
                    if (buffer.length > 0) {
                        this._next(buffer.shift());
                    }
                    else if (this.active === 0 && this.hasCompleted) {
                        if (this.hasValue === false) {
                            this.destination.next(this.acc);
                        }
                        this.destination.complete();
                    }
                }
            }
            exports_1("MergeScanSubscriber", MergeScanSubscriber);
        }
    }
});
