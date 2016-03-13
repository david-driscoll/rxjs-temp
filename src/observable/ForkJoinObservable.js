System.register(['../Observable', '../Subscriber', './PromiseObservable', './EmptyObservable', '../util/isPromise', '../util/isArray'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, Subscriber_1, PromiseObservable_1, EmptyObservable_1, isPromise_1, isArray_1;
    var ForkJoinObservable, AllSubscriber;
    function hasValue(x) {
        return x === true;
    }
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (PromiseObservable_1_1) {
                PromiseObservable_1 = PromiseObservable_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            },
            function (isPromise_1_1) {
                isPromise_1 = isPromise_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            }],
        execute: function() {
            class ForkJoinObservable extends Observable_1.Observable {
                constructor(sources, resultSelector) {
                    super();
                    this.sources = sources;
                    this.resultSelector = resultSelector;
                }
                static create(...sources) {
                    if (sources === null || arguments.length === 0) {
                        return new EmptyObservable_1.EmptyObservable();
                    }
                    let resultSelector = null;
                    if (typeof sources[sources.length - 1] === 'function') {
                        resultSelector = sources.pop();
                    }
                    if (sources.length === 1 && isArray_1.isArray(sources[0])) {
                        sources = sources[0];
                    }
                    if (sources.length === 0) {
                        return new EmptyObservable_1.EmptyObservable();
                    }
                    return new ForkJoinObservable(sources, resultSelector);
                }
                _subscribe(subscriber) {
                    const sources = this.sources;
                    const len = sources.length;
                    const context = { completed: 0,
                        total: len,
                        values: new Array(len),
                        haveValues: new Array(len),
                        selector: this.resultSelector };
                    for (let i = 0; i < len; i++) {
                        let source = sources[i];
                        if (isPromise_1.isPromise(source)) {
                            source = new PromiseObservable_1.PromiseObservable(source);
                        }
                        source.subscribe(new AllSubscriber(subscriber, i, context));
                    }
                }
            }
            exports_1("ForkJoinObservable", ForkJoinObservable);
            class AllSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, index, context) {
                    super(destination);
                    this.index = index;
                    this.context = context;
                }
                _next(value) {
                    const context = this.context;
                    const index = this.index;
                    context.values[index] = value;
                    context.haveValues[index] = true;
                }
                _complete() {
                    const destination = this.destination;
                    const context = this.context;
                    if (!context.haveValues[this.index]) {
                        destination.complete();
                    }
                    context.completed++;
                    const values = context.values;
                    if (context.completed !== values.length) {
                        return;
                    }
                    if (context.haveValues.every(hasValue)) {
                        const value = context.selector ? context.selector.apply(this, values) :
                            values;
                        destination.next(value);
                    }
                    destination.complete();
                }
            }
        }
    }
});
