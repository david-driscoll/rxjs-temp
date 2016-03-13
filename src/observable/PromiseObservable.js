System.register(['../util/root', '../Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1, Observable_1;
    var PromiseObservable;
    function dispatchNext({ value, subscriber }) {
        if (!subscriber.isUnsubscribed) {
            subscriber.next(value);
            subscriber.complete();
        }
    }
    function dispatchError({ err, subscriber }) {
        if (!subscriber.isUnsubscribed) {
            subscriber.error(err);
        }
    }
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            class PromiseObservable extends Observable_1.Observable {
                constructor(promise, scheduler = null) {
                    super();
                    this.promise = promise;
                    this.scheduler = scheduler;
                }
                static create(promise, scheduler = null) {
                    return new PromiseObservable(promise, scheduler);
                }
                _subscribe(subscriber) {
                    const promise = this.promise;
                    const scheduler = this.scheduler;
                    if (scheduler == null) {
                        if (this._isScalar) {
                            if (!subscriber.isUnsubscribed) {
                                subscriber.next(this.value);
                                subscriber.complete();
                            }
                        }
                        else {
                            promise.then((value) => {
                                this.value = value;
                                this._isScalar = true;
                                if (!subscriber.isUnsubscribed) {
                                    subscriber.next(value);
                                    subscriber.complete();
                                }
                            }, (err) => {
                                if (!subscriber.isUnsubscribed) {
                                    subscriber.error(err);
                                }
                            })
                                .then(null, err => {
                                root_1.root.setTimeout(() => { throw err; });
                            });
                        }
                    }
                    else {
                        if (this._isScalar) {
                            if (!subscriber.isUnsubscribed) {
                                return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                            }
                        }
                        else {
                            promise.then((value) => {
                                this.value = value;
                                this._isScalar = true;
                                if (!subscriber.isUnsubscribed) {
                                    subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                                }
                            }, (err) => {
                                if (!subscriber.isUnsubscribed) {
                                    subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                                }
                            })
                                .then(null, (err) => {
                                root_1.root.setTimeout(() => { throw err; });
                            });
                        }
                    }
                }
            }
            exports_1("PromiseObservable", PromiseObservable);
        }
    }
});
