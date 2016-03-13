System.register(['../observable/ArrayObservable', '../util/isArray', '../util/isScheduler', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ArrayObservable_1, isArray_1, isScheduler_1, OuterSubscriber_1, subscribeToResult_1;
    var CombineLatestOperator, CombineLatestSubscriber;
    function combineLatest(...observables) {
        let project = null;
        if (typeof observables[observables.length - 1] === 'function') {
            project = observables.pop();
        }
        if (observables.length === 1 && isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        observables.unshift(this);
        return new ArrayObservable_1.ArrayObservable(observables).lift(new CombineLatestOperator(project));
    }
    exports_1("combineLatest", combineLatest);
    function combineLatestStatic(...observables) {
        let project = null;
        let scheduler = null;
        if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
            scheduler = observables.pop();
        }
        if (typeof observables[observables.length - 1] === 'function') {
            project = observables.pop();
        }
        if (observables.length === 1 && isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new CombineLatestOperator(project));
    }
    exports_1("combineLatestStatic", combineLatestStatic);
    return {
        setters:[
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class CombineLatestOperator {
                constructor(project) {
                    this.project = project;
                }
                call(subscriber) {
                    return new CombineLatestSubscriber(subscriber, this.project);
                }
            }
            exports_1("CombineLatestOperator", CombineLatestOperator);
            class CombineLatestSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, project) {
                    super(destination);
                    this.project = project;
                    this.active = 0;
                    this.values = [];
                    this.observables = [];
                    this.toRespond = [];
                }
                _next(observable) {
                    const toRespond = this.toRespond;
                    toRespond.push(toRespond.length);
                    this.observables.push(observable);
                }
                _complete() {
                    const observables = this.observables;
                    const len = observables.length;
                    if (len === 0) {
                        this.destination.complete();
                    }
                    else {
                        this.active = len;
                        for (let i = 0; i < len; i++) {
                            const observable = observables[i];
                            this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
                        }
                    }
                }
                notifyComplete(unused) {
                    if ((this.active -= 1) === 0) {
                        this.destination.complete();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    const values = this.values;
                    values[outerIndex] = innerValue;
                    const toRespond = this.toRespond;
                    if (toRespond.length > 0) {
                        const found = toRespond.indexOf(outerIndex);
                        if (found !== -1) {
                            toRespond.splice(found, 1);
                        }
                    }
                    if (toRespond.length === 0) {
                        if (this.project) {
                            this._tryProject(values);
                        }
                        else {
                            this.destination.next(values);
                        }
                    }
                }
                _tryProject(values) {
                    let result;
                    try {
                        result = this.project.apply(this, values);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.destination.next(result);
                }
            }
            exports_1("CombineLatestSubscriber", CombineLatestSubscriber);
        }
    }
});
