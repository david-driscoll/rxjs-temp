System.register(['../util/tryCatch', '../util/errorObject', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1;
    var ExpandOperator, ExpandSubscriber;
    function expand(project, concurrent = Number.POSITIVE_INFINITY, scheduler = undefined) {
        concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
        return this.lift(new ExpandOperator(project, concurrent, scheduler));
    }
    exports_1("expand", expand);
    return {
        setters:[
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class ExpandOperator {
                constructor(project, concurrent, scheduler) {
                    this.project = project;
                    this.concurrent = concurrent;
                    this.scheduler = scheduler;
                }
                call(subscriber) {
                    return new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler);
                }
            }
            exports_1("ExpandOperator", ExpandOperator);
            class ExpandSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, project, concurrent, scheduler) {
                    super(destination);
                    this.project = project;
                    this.concurrent = concurrent;
                    this.scheduler = scheduler;
                    this.index = 0;
                    this.active = 0;
                    this.hasCompleted = false;
                    if (concurrent < Number.POSITIVE_INFINITY) {
                        this.buffer = [];
                    }
                }
                static dispatch({ subscriber, result, value, index }) {
                    subscriber.subscribeToProjection(result, value, index);
                }
                _next(value) {
                    const destination = this.destination;
                    if (destination.isUnsubscribed) {
                        this._complete();
                        return;
                    }
                    const index = this.index++;
                    if (this.active < this.concurrent) {
                        destination.next(value);
                        let result = tryCatch_1.tryCatch(this.project)(value, index);
                        if (result === errorObject_1.errorObject) {
                            destination.error(errorObject_1.errorObject.e);
                        }
                        else if (!this.scheduler) {
                            this.subscribeToProjection(result, value, index);
                        }
                        else {
                            const state = { subscriber: this, result: result, value: value, index: index };
                            this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
                        }
                    }
                    else {
                        this.buffer.push(value);
                    }
                }
                subscribeToProjection(result, value, index) {
                    this.active++;
                    this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
                }
                _complete() {
                    this.hasCompleted = true;
                    if (this.hasCompleted && this.active === 0) {
                        this.destination.complete();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this._next(innerValue);
                }
                notifyComplete(innerSub) {
                    const buffer = this.buffer;
                    this.remove(innerSub);
                    this.active--;
                    if (buffer && buffer.length > 0) {
                        this._next(buffer.shift());
                    }
                    if (this.hasCompleted && this.active === 0) {
                        this.destination.complete();
                    }
                }
            }
            exports_1("ExpandSubscriber", ExpandSubscriber);
        }
    }
});
