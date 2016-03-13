System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var WithLatestFromOperator, WithLatestFromSubscriber;
    function withLatestFrom(...args) {
        let project;
        if (typeof args[args.length - 1] === 'function') {
            project = args.pop();
        }
        const observables = args;
        return this.lift(new WithLatestFromOperator(observables, project));
    }
    exports_1("withLatestFrom", withLatestFrom);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class WithLatestFromOperator {
                constructor(observables, project) {
                    this.observables = observables;
                    this.project = project;
                }
                call(subscriber) {
                    return new WithLatestFromSubscriber(subscriber, this.observables, this.project);
                }
            }
            class WithLatestFromSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, observables, project) {
                    super(destination);
                    this.observables = observables;
                    this.project = project;
                    this.toRespond = [];
                    const len = observables.length;
                    this.values = new Array(len);
                    for (let i = 0; i < len; i++) {
                        this.toRespond.push(i);
                    }
                    for (let i = 0; i < len; i++) {
                        let observable = observables[i];
                        this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.values[outerIndex] = innerValue;
                    const toRespond = this.toRespond;
                    if (toRespond.length > 0) {
                        const found = toRespond.indexOf(outerIndex);
                        if (found !== -1) {
                            toRespond.splice(found, 1);
                        }
                    }
                }
                notifyComplete() {
                }
                _next(value) {
                    if (this.toRespond.length === 0) {
                        const args = [value, ...this.values];
                        if (this.project) {
                            this._tryProject(args);
                        }
                        else {
                            this.destination.next(args);
                        }
                    }
                }
                _tryProject(args) {
                    let result;
                    try {
                        result = this.project.apply(this, args);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.destination.next(result);
                }
            }
        }
    }
});
