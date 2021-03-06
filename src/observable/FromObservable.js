System.register(['../util/isArray', '../util/isFunction', '../util/isPromise', '../util/isScheduler', './PromiseObservable', './IteratorObservable', './ArrayObservable', './ArrayLikeObservable', '../util/SymbolShim', '../Observable', '../operator/observeOn'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isArray_1, isFunction_1, isPromise_1, isScheduler_1, PromiseObservable_1, IteratorObservable_1, ArrayObservable_1, ArrayLikeObservable_1, SymbolShim_1, Observable_1, observeOn_1;
    var isArrayLike, FromObservable;
    return {
        setters:[
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (isFunction_1_1) {
                isFunction_1 = isFunction_1_1;
            },
            function (isPromise_1_1) {
                isPromise_1 = isPromise_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            },
            function (PromiseObservable_1_1) {
                PromiseObservable_1 = PromiseObservable_1_1;
            },
            function (IteratorObservable_1_1) {
                IteratorObservable_1 = IteratorObservable_1_1;
            },
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (ArrayLikeObservable_1_1) {
                ArrayLikeObservable_1 = ArrayLikeObservable_1_1;
            },
            function (SymbolShim_1_1) {
                SymbolShim_1 = SymbolShim_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (observeOn_1_1) {
                observeOn_1 = observeOn_1_1;
            }],
        execute: function() {
            isArrayLike = ((x) => x && typeof x.length === 'number');
            class FromObservable extends Observable_1.Observable {
                constructor(ish, scheduler) {
                    super(null);
                    this.ish = ish;
                    this.scheduler = scheduler;
                }
                static create(ish, mapFnOrScheduler, thisArg, lastScheduler) {
                    let scheduler = null;
                    let mapFn = null;
                    if (isFunction_1.isFunction(mapFnOrScheduler)) {
                        scheduler = lastScheduler || null;
                        mapFn = mapFnOrScheduler;
                    }
                    else if (isScheduler_1.isScheduler(scheduler)) {
                        scheduler = mapFnOrScheduler;
                    }
                    if (ish != null) {
                        if (typeof ish[SymbolShim_1.SymbolShim.observable] === 'function') {
                            if (ish instanceof Observable_1.Observable && !scheduler) {
                                return ish;
                            }
                            return new FromObservable(ish, scheduler);
                        }
                        else if (isArray_1.isArray(ish)) {
                            return new ArrayObservable_1.ArrayObservable(ish, scheduler);
                        }
                        else if (isPromise_1.isPromise(ish)) {
                            return new PromiseObservable_1.PromiseObservable(ish, scheduler);
                        }
                        else if (typeof ish[SymbolShim_1.SymbolShim.iterator] === 'function' || typeof ish === 'string') {
                            return new IteratorObservable_1.IteratorObservable(ish, null, null, scheduler);
                        }
                        else if (isArrayLike(ish)) {
                            return new ArrayLikeObservable_1.ArrayLikeObservable(ish, mapFn, thisArg, scheduler);
                        }
                    }
                    throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
                }
                _subscribe(subscriber) {
                    const ish = this.ish;
                    const scheduler = this.scheduler;
                    if (scheduler == null) {
                        return ish[SymbolShim_1.SymbolShim.observable]().subscribe(subscriber);
                    }
                    else {
                        return ish[SymbolShim_1.SymbolShim.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
                    }
                }
            }
            exports_1("FromObservable", FromObservable);
        }
    }
});
