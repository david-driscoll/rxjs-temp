System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var MergeAllOperator, MergeAllSubscriber;
    function mergeAll(concurrent = Number.POSITIVE_INFINITY) {
        return this.lift(new MergeAllOperator(concurrent));
    }
    exports_1("mergeAll", mergeAll);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class MergeAllOperator {
                constructor(concurrent) {
                    this.concurrent = concurrent;
                }
                call(observer) {
                    return new MergeAllSubscriber(observer, this.concurrent);
                }
            }
            exports_1("MergeAllOperator", MergeAllOperator);
            class MergeAllSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, concurrent) {
                    super(destination);
                    this.concurrent = concurrent;
                    this.hasCompleted = false;
                    this.buffer = [];
                    this.active = 0;
                }
                _next(observable) {
                    if (this.active < this.concurrent) {
                        this.active++;
                        this.add(subscribeToResult_1.subscribeToResult(this, observable));
                    }
                    else {
                        this.buffer.push(observable);
                    }
                }
                _complete() {
                    this.hasCompleted = true;
                    if (this.active === 0 && this.buffer.length === 0) {
                        this.destination.complete();
                    }
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
            exports_1("MergeAllSubscriber", MergeAllSubscriber);
        }
    }
});
