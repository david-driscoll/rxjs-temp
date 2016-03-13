System.register(['../observable/ArrayObservable', '../util/isArray', '../Subscriber', '../OuterSubscriber', '../util/subscribeToResult', '../util/SymbolShim'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ArrayObservable_1, isArray_1, Subscriber_1, OuterSubscriber_1, subscribeToResult_1, SymbolShim_1;
    var ZipOperator, ZipSubscriber, StaticIterator, StaticArrayIterator, ZipBufferIterator;
    function zipProto(...observables) {
        observables.unshift(this);
        return zipStatic.apply(this, observables);
    }
    exports_1("zipProto", zipProto);
    function zipStatic(...observables) {
        const project = observables[observables.length - 1];
        if (typeof project === 'function') {
            observables.pop();
        }
        return new ArrayObservable_1.ArrayObservable(observables).lift(new ZipOperator(project));
    }
    exports_1("zipStatic", zipStatic);
    return {
        setters:[
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            },
            function (SymbolShim_1_1) {
                SymbolShim_1 = SymbolShim_1_1;
            }],
        execute: function() {
            class ZipOperator {
                constructor(project) {
                    this.project = project;
                }
                call(subscriber) {
                    return new ZipSubscriber(subscriber, this.project);
                }
            }
            exports_1("ZipOperator", ZipOperator);
            class ZipSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, project, values = Object.create(null)) {
                    super(destination);
                    this.index = 0;
                    this.iterators = [];
                    this.active = 0;
                    this.project = (typeof project === 'function') ? project : null;
                    this.values = values;
                }
                _next(value) {
                    const iterators = this.iterators;
                    const index = this.index++;
                    if (isArray_1.isArray(value)) {
                        iterators.push(new StaticArrayIterator(value));
                    }
                    else if (typeof value[SymbolShim_1.SymbolShim.iterator] === 'function') {
                        iterators.push(new StaticIterator(value[SymbolShim_1.SymbolShim.iterator]()));
                    }
                    else {
                        iterators.push(new ZipBufferIterator(this.destination, this, value, index));
                    }
                }
                _complete() {
                    const iterators = this.iterators;
                    const len = iterators.length;
                    this.active = len;
                    for (let i = 0; i < len; i++) {
                        let iterator = iterators[i];
                        if (iterator.stillUnsubscribed) {
                            this.add(iterator.subscribe(iterator, i));
                        }
                        else {
                            this.active--;
                        }
                    }
                }
                notifyInactive() {
                    this.active--;
                    if (this.active === 0) {
                        this.destination.complete();
                    }
                }
                checkIterators() {
                    const iterators = this.iterators;
                    const len = iterators.length;
                    const destination = this.destination;
                    for (let i = 0; i < len; i++) {
                        let iterator = iterators[i];
                        if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                            return;
                        }
                    }
                    let shouldComplete = false;
                    const args = [];
                    for (let i = 0; i < len; i++) {
                        let iterator = iterators[i];
                        let result = iterator.next();
                        if (iterator.hasCompleted()) {
                            shouldComplete = true;
                        }
                        if (result.done) {
                            destination.complete();
                            return;
                        }
                        args.push(result.value);
                    }
                    if (this.project) {
                        this._tryProject(args);
                    }
                    else {
                        destination.next(args);
                    }
                    if (shouldComplete) {
                        destination.complete();
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
            exports_1("ZipSubscriber", ZipSubscriber);
            class StaticIterator {
                constructor(iterator) {
                    this.iterator = iterator;
                    this.nextResult = iterator.next();
                }
                hasValue() {
                    return true;
                }
                next() {
                    const result = this.nextResult;
                    this.nextResult = this.iterator.next();
                    return result;
                }
                hasCompleted() {
                    const nextResult = this.nextResult;
                    return nextResult && nextResult.done;
                }
            }
            class StaticArrayIterator {
                constructor(array) {
                    this.array = array;
                    this.index = 0;
                    this.length = 0;
                    this.length = array.length;
                }
                [SymbolShim_1.SymbolShim.iterator]() {
                    return this;
                }
                next(value) {
                    const i = this.index++;
                    const array = this.array;
                    return i < this.length ? { value: array[i], done: false } : { done: true };
                }
                hasValue() {
                    return this.array.length > this.index;
                }
                hasCompleted() {
                    return this.array.length === this.index;
                }
            }
            class ZipBufferIterator extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, parent, observable, index) {
                    super(destination);
                    this.parent = parent;
                    this.observable = observable;
                    this.index = index;
                    this.stillUnsubscribed = true;
                    this.buffer = [];
                    this.isComplete = false;
                }
                [SymbolShim_1.SymbolShim.iterator]() {
                    return this;
                }
                next() {
                    const buffer = this.buffer;
                    if (buffer.length === 0 && this.isComplete) {
                        return { done: true };
                    }
                    else {
                        return { value: buffer.shift(), done: false };
                    }
                }
                hasValue() {
                    return this.buffer.length > 0;
                }
                hasCompleted() {
                    return this.buffer.length === 0 && this.isComplete;
                }
                notifyComplete() {
                    if (this.buffer.length > 0) {
                        this.isComplete = true;
                        this.parent.notifyInactive();
                    }
                    else {
                        this.destination.complete();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.buffer.push(innerValue);
                    this.parent.checkIterators();
                }
                subscribe(value, index) {
                    return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
                }
            }
        }
    }
});
