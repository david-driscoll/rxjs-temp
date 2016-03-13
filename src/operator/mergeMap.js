System.register(['../util/subscribeToResult', '../OuterSubscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var subscribeToResult_1, OuterSubscriber_1;
    var MergeMapOperator, MergeMapSubscriber;
    function mergeMap(project, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
        return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
    }
    exports_1("mergeMap", mergeMap);
    return {
        setters:[
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            }],
        execute: function() {
            class MergeMapOperator {
                constructor(project, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
                    this.project = project;
                    this.resultSelector = resultSelector;
                    this.concurrent = concurrent;
                }
                call(observer) {
                    return new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent);
                }
            }
            exports_1("MergeMapOperator", MergeMapOperator);
            class MergeMapSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, project, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
                    super(destination);
                    this.project = project;
                    this.resultSelector = resultSelector;
                    this.concurrent = concurrent;
                    this.hasCompleted = false;
                    this.buffer = [];
                    this.active = 0;
                    this.index = 0;
                }
                _next(value) {
                    if (this.active < this.concurrent) {
                        this._tryNext(value);
                    }
                    else {
                        this.buffer.push(value);
                    }
                }
                _tryNext(value) {
                    let result;
                    const index = this.index++;
                    try {
                        result = this.project(value, index);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.active++;
                    this._innerSub(result, value, index);
                }
                _innerSub(ish, value, index) {
                    this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
                }
                _complete() {
                    this.hasCompleted = true;
                    if (this.active === 0 && this.buffer.length === 0) {
                        this.destination.complete();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    if (this.resultSelector) {
                        this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
                    }
                    else {
                        this.destination.next(innerValue);
                    }
                }
                _notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex) {
                    let result;
                    try {
                        result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.destination.next(result);
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
            exports_1("MergeMapSubscriber", MergeMapSubscriber);
        }
    }
});
