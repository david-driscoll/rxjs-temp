System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var SwitchFirstMapOperator, SwitchFirstMapSubscriber;
    function exhaustMap(project, resultSelector) {
        return this.lift(new SwitchFirstMapOperator(project, resultSelector));
    }
    exports_1("exhaustMap", exhaustMap);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class SwitchFirstMapOperator {
                constructor(project, resultSelector) {
                    this.project = project;
                    this.resultSelector = resultSelector;
                }
                call(subscriber) {
                    return new SwitchFirstMapSubscriber(subscriber, this.project, this.resultSelector);
                }
            }
            class SwitchFirstMapSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, project, resultSelector) {
                    super(destination);
                    this.project = project;
                    this.resultSelector = resultSelector;
                    this.hasSubscription = false;
                    this.hasCompleted = false;
                    this.index = 0;
                }
                _next(value) {
                    if (!this.hasSubscription) {
                        this.tryNext(value);
                    }
                }
                tryNext(value) {
                    const index = this.index++;
                    const destination = this.destination;
                    try {
                        const result = this.project(value, index);
                        this.hasSubscription = true;
                        this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
                    }
                    catch (err) {
                        destination.error(err);
                    }
                }
                _complete() {
                    this.hasCompleted = true;
                    if (!this.hasSubscription) {
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
                    try {
                        const result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
                        destination.next(result);
                    }
                    catch (err) {
                        destination.error(err);
                    }
                }
                notifyError(err) {
                    this.destination.error(err);
                }
                notifyComplete(innerSub) {
                    this.remove(innerSub);
                    this.hasSubscription = false;
                    if (this.hasCompleted) {
                        this.destination.complete();
                    }
                }
            }
        }
    }
});
