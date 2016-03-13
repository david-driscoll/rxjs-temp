System.register(['./util/root', './util/SymbolShim', './util/toSubscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1, SymbolShim_1, toSubscriber_1;
    var Observable;
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (SymbolShim_1_1) {
                SymbolShim_1 = SymbolShim_1_1;
            },
            function (toSubscriber_1_1) {
                toSubscriber_1 = toSubscriber_1_1;
            }],
        execute: function() {
            class Observable {
                constructor(subscribe) {
                    this._isScalar = false;
                    if (subscribe) {
                        this._subscribe = subscribe;
                    }
                }
                lift(operator) {
                    const observable = new Observable();
                    observable.source = this;
                    observable.operator = operator;
                    return observable;
                }
                subscribe(observerOrNext, error, complete) {
                    const { operator } = this;
                    const subscriber = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
                    if (operator) {
                        subscriber.add(this._subscribe(operator.call(subscriber)));
                    }
                    else {
                        subscriber.add(this._subscribe(subscriber));
                    }
                    if (subscriber.syncErrorThrowable) {
                        subscriber.syncErrorThrowable = false;
                        if (subscriber.syncErrorThrown) {
                            throw subscriber.syncErrorValue;
                        }
                    }
                    return subscriber;
                }
                forEach(next, PromiseCtor) {
                    if (!PromiseCtor) {
                        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                            PromiseCtor = root_1.root.Rx.config.Promise;
                        }
                        else if (root_1.root.Promise) {
                            PromiseCtor = root_1.root.Promise;
                        }
                    }
                    if (!PromiseCtor) {
                        throw new Error('no Promise impl found');
                    }
                    return new PromiseCtor((resolve, reject) => {
                        const subscription = this.subscribe((value) => {
                            if (subscription) {
                                try {
                                    next(value);
                                }
                                catch (err) {
                                    reject(err);
                                    subscription.unsubscribe();
                                }
                            }
                            else {
                                next(value);
                            }
                        }, reject, resolve);
                    });
                }
                _subscribe(subscriber) {
                    return this.source.subscribe(subscriber);
                }
                [SymbolShim_1.SymbolShim.observable]() {
                    return this;
                }
            }
            Observable.create = (subscribe) => {
                return new Observable(subscribe);
            };
            exports_1("Observable", Observable);
        }
    }
});
