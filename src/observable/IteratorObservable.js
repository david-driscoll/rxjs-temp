System.register(['../util/root', '../util/isObject', '../util/tryCatch', '../Observable', '../util/isFunction', '../util/SymbolShim', '../util/errorObject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1, isObject_1, tryCatch_1, Observable_1, isFunction_1, SymbolShim_1, errorObject_1;
    var IteratorObservable, StringIterator, ArrayIterator, maxSafeInteger;
    function getIterator(obj) {
        const i = obj[SymbolShim_1.SymbolShim.iterator];
        if (!i && typeof obj === 'string') {
            return new StringIterator(obj);
        }
        if (!i && obj.length !== undefined) {
            return new ArrayIterator(obj);
        }
        if (!i) {
            throw new TypeError('Object is not iterable');
        }
        return obj[SymbolShim_1.SymbolShim.iterator]();
    }
    function toLength(o) {
        let len = +o.length;
        if (isNaN(len)) {
            return 0;
        }
        if (len === 0 || !numberIsFinite(len)) {
            return len;
        }
        len = sign(len) * Math.floor(Math.abs(len));
        if (len <= 0) {
            return 0;
        }
        if (len > maxSafeInteger) {
            return maxSafeInteger;
        }
        return len;
    }
    function numberIsFinite(value) {
        return typeof value === 'number' && root_1.root.isFinite(value);
    }
    function sign(value) {
        let valueAsNumber = +value;
        if (valueAsNumber === 0) {
            return valueAsNumber;
        }
        if (isNaN(valueAsNumber)) {
            return valueAsNumber;
        }
        return valueAsNumber < 0 ? -1 : 1;
    }
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (isObject_1_1) {
                isObject_1 = isObject_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (isFunction_1_1) {
                isFunction_1 = isFunction_1_1;
            },
            function (SymbolShim_1_1) {
                SymbolShim_1 = SymbolShim_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            }],
        execute: function() {
            class IteratorObservable extends Observable_1.Observable {
                constructor(iterator, project, thisArg, scheduler) {
                    super();
                    if (iterator == null) {
                        throw new Error('iterator cannot be null.');
                    }
                    if (isObject_1.isObject(project)) {
                        this.thisArg = project;
                        this.scheduler = thisArg;
                    }
                    else if (isFunction_1.isFunction(project)) {
                        this.project = project;
                        this.thisArg = thisArg;
                        this.scheduler = scheduler;
                    }
                    else if (project != null) {
                        throw new Error('When provided, `project` must be a function.');
                    }
                    this.iterator = getIterator(iterator);
                }
                static create(iterator, project, thisArg, scheduler) {
                    return new IteratorObservable(iterator, project, thisArg, scheduler);
                }
                static dispatch(state) {
                    const { index, hasError, thisArg, project, iterator, subscriber } = state;
                    if (hasError) {
                        subscriber.error(state.error);
                        return;
                    }
                    let result = iterator.next();
                    if (result.done) {
                        subscriber.complete();
                        return;
                    }
                    if (project) {
                        result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index);
                        if (result === errorObject_1.errorObject) {
                            state.error = errorObject_1.errorObject.e;
                            state.hasError = true;
                        }
                        else {
                            subscriber.next(result);
                            state.index = index + 1;
                        }
                    }
                    else {
                        subscriber.next(result.value);
                        state.index = index + 1;
                    }
                    if (subscriber.isUnsubscribed) {
                        return;
                    }
                    this.schedule(state);
                }
                _subscribe(subscriber) {
                    let index = 0;
                    const { iterator, project, thisArg, scheduler } = this;
                    if (scheduler) {
                        return scheduler.schedule(IteratorObservable.dispatch, 0, {
                            index: index, thisArg: thisArg, project: project, iterator: iterator, subscriber: subscriber
                        });
                    }
                    else {
                        do {
                            let result = iterator.next();
                            if (result.done) {
                                subscriber.complete();
                                break;
                            }
                            else if (project) {
                                result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index++);
                                if (result === errorObject_1.errorObject) {
                                    subscriber.error(errorObject_1.errorObject.e);
                                    break;
                                }
                                subscriber.next(result);
                            }
                            else {
                                subscriber.next(result.value);
                            }
                            if (subscriber.isUnsubscribed) {
                                break;
                            }
                        } while (true);
                    }
                }
            }
            exports_1("IteratorObservable", IteratorObservable);
            class StringIterator {
                constructor(str, idx = 0, len = str.length) {
                    this.str = str;
                    this.idx = idx;
                    this.len = len;
                }
                [SymbolShim_1.SymbolShim.iterator]() { return (this); }
                next() {
                    return this.idx < this.len ? {
                        done: false,
                        value: this.str.charAt(this.idx++)
                    } : {
                        done: true,
                        value: undefined
                    };
                }
            }
            class ArrayIterator {
                constructor(arr, idx = 0, len = toLength(arr)) {
                    this.arr = arr;
                    this.idx = idx;
                    this.len = len;
                }
                [SymbolShim_1.SymbolShim.iterator]() { return this; }
                next() {
                    return this.idx < this.len ? {
                        done: false,
                        value: this.arr[this.idx++]
                    } : {
                        done: true,
                        value: undefined
                    };
                }
            }
            maxSafeInteger = Math.pow(2, 53) - 1;
        }
    }
});
