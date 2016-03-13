System.register(['../Observable', '../util/tryCatch', '../util/errorObject', '../subject/AsyncSubject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, tryCatch_1, errorObject_1, AsyncSubject_1;
    var BoundNodeCallbackObservable;
    function dispatch(state) {
        const self = this;
        const { source, subscriber } = state;
        const { callbackFunc, args, scheduler } = source;
        let subject = source.subject;
        if (!subject) {
            subject = source.subject = new AsyncSubject_1.AsyncSubject();
            const handler = function handlerFn(...innerArgs) {
                const source = handlerFn.source;
                const { selector, subject } = source;
                const err = innerArgs.shift();
                if (err) {
                    subject.error(err);
                }
                else if (selector) {
                    const result = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                    if (result === errorObject_1.errorObject) {
                        self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
                    }
                    else {
                        self.add(scheduler.schedule(dispatchNext, 0, { value: result, subject: subject }));
                    }
                }
                else {
                    const value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
                    self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
                }
            };
            handler.source = source;
            const result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
            if (result === errorObject_1.errorObject) {
                subject.error(errorObject_1.errorObject.e);
            }
        }
        self.add(subject.subscribe(subscriber));
    }
    function dispatchNext({ value, subject }) {
        subject.next(value);
        subject.complete();
    }
    function dispatchError({ err, subject }) {
        subject.error(err);
    }
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (AsyncSubject_1_1) {
                AsyncSubject_1 = AsyncSubject_1_1;
            }],
        execute: function() {
            class BoundNodeCallbackObservable extends Observable_1.Observable {
                constructor(callbackFunc, selector, args, scheduler) {
                    super();
                    this.callbackFunc = callbackFunc;
                    this.selector = selector;
                    this.args = args;
                    this.scheduler = scheduler;
                }
                static create(callbackFunc, selector = undefined, scheduler) {
                    return (...args) => {
                        return new BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler);
                    };
                }
                _subscribe(subscriber) {
                    const callbackFunc = this.callbackFunc;
                    const args = this.args;
                    const scheduler = this.scheduler;
                    let subject = this.subject;
                    if (!scheduler) {
                        if (!subject) {
                            subject = this.subject = new AsyncSubject_1.AsyncSubject();
                            const handler = function handlerFn(...innerArgs) {
                                const source = handlerFn.source;
                                const { selector, subject } = source;
                                const err = innerArgs.shift();
                                if (err) {
                                    subject.error(err);
                                }
                                else if (selector) {
                                    const result = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                                    if (result === errorObject_1.errorObject) {
                                        subject.error(errorObject_1.errorObject.e);
                                    }
                                    else {
                                        subject.next(result);
                                        subject.complete();
                                    }
                                }
                                else {
                                    subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                                    subject.complete();
                                }
                            };
                            handler.source = this;
                            const result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
                            if (result === errorObject_1.errorObject) {
                                subject.error(errorObject_1.errorObject.e);
                            }
                        }
                        return subject.subscribe(subscriber);
                    }
                    else {
                        return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber });
                    }
                }
            }
            exports_1("BoundNodeCallbackObservable", BoundNodeCallbackObservable);
        }
    }
});
