System.register(['./util/isFunction', './Subscription', './symbol/rxSubscriber', './Observer'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isFunction_1, Subscription_1, rxSubscriber_1, Observer_1;
    var Subscriber, SafeSubscriber;
    return {
        setters:[
            function (isFunction_1_1) {
                isFunction_1 = isFunction_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (rxSubscriber_1_1) {
                rxSubscriber_1 = rxSubscriber_1_1;
            },
            function (Observer_1_1) {
                Observer_1 = Observer_1_1;
            }],
        execute: function() {
            class Subscriber extends Subscription_1.Subscription {
                constructor(destinationOrNext, error, complete) {
                    super();
                    this.syncErrorValue = null;
                    this.syncErrorThrown = false;
                    this.syncErrorThrowable = false;
                    this.isStopped = false;
                    switch (arguments.length) {
                        case 0:
                            this.destination = Observer_1.empty;
                            break;
                        case 1:
                            if (!destinationOrNext) {
                                this.destination = Observer_1.empty;
                                break;
                            }
                            if (typeof destinationOrNext === 'object') {
                                if (destinationOrNext instanceof Subscriber) {
                                    this.destination = destinationOrNext;
                                }
                                else {
                                    this.syncErrorThrowable = true;
                                    this.destination = new SafeSubscriber(this, destinationOrNext);
                                }
                                break;
                            }
                        default:
                            this.syncErrorThrowable = true;
                            this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                            break;
                    }
                }
                static create(next, error, complete) {
                    const subscriber = new Subscriber(next, error, complete);
                    subscriber.syncErrorThrowable = false;
                    return subscriber;
                }
                next(value) {
                    if (!this.isStopped) {
                        this._next(value);
                    }
                }
                error(err) {
                    if (!this.isStopped) {
                        this.isStopped = true;
                        this._error(err);
                    }
                }
                complete() {
                    if (!this.isStopped) {
                        this.isStopped = true;
                        this._complete();
                    }
                }
                unsubscribe() {
                    if (this.isUnsubscribed) {
                        return;
                    }
                    this.isStopped = true;
                    super.unsubscribe();
                }
                _next(value) {
                    this.destination.next(value);
                }
                _error(err) {
                    this.destination.error(err);
                    this.unsubscribe();
                }
                _complete() {
                    this.destination.complete();
                    this.unsubscribe();
                }
                [rxSubscriber_1.rxSubscriber]() {
                    return this;
                }
            }
            exports_1("Subscriber", Subscriber);
            class SafeSubscriber extends Subscriber {
                constructor(_parent, observerOrNext, error, complete) {
                    super();
                    this._parent = _parent;
                    let next;
                    let context = this;
                    if (isFunction_1.isFunction(observerOrNext)) {
                        next = observerOrNext;
                    }
                    else if (observerOrNext) {
                        context = observerOrNext;
                        next = observerOrNext.next;
                        error = observerOrNext.error;
                        complete = observerOrNext.complete;
                    }
                    this._context = context;
                    this._next = next;
                    this._error = error;
                    this._complete = complete;
                }
                next(value) {
                    if (!this.isStopped && this._next) {
                        const { _parent } = this;
                        if (!_parent.syncErrorThrowable) {
                            this.__tryOrUnsub(this._next, value);
                        }
                        else if (this.__tryOrSetError(_parent, this._next, value)) {
                            this.unsubscribe();
                        }
                    }
                }
                error(err) {
                    if (!this.isStopped) {
                        const { _parent } = this;
                        if (this._error) {
                            if (!_parent.syncErrorThrowable) {
                                this.__tryOrUnsub(this._error, err);
                                this.unsubscribe();
                            }
                            else {
                                this.__tryOrSetError(_parent, this._error, err);
                                this.unsubscribe();
                            }
                        }
                        else if (!_parent.syncErrorThrowable) {
                            this.unsubscribe();
                            throw err;
                        }
                        else {
                            _parent.syncErrorValue = err;
                            _parent.syncErrorThrown = true;
                            this.unsubscribe();
                        }
                    }
                }
                complete() {
                    if (!this.isStopped) {
                        const { _parent } = this;
                        if (this._complete) {
                            if (!_parent.syncErrorThrowable) {
                                this.__tryOrUnsub(this._complete);
                                this.unsubscribe();
                            }
                            else {
                                this.__tryOrSetError(_parent, this._complete);
                                this.unsubscribe();
                            }
                        }
                        else {
                            this.unsubscribe();
                        }
                    }
                }
                __tryOrUnsub(fn, value) {
                    try {
                        fn.call(this._context, value);
                    }
                    catch (err) {
                        this.unsubscribe();
                        throw err;
                    }
                }
                __tryOrSetError(parent, fn, value) {
                    try {
                        fn.call(this._context, value);
                    }
                    catch (err) {
                        parent.syncErrorValue = err;
                        parent.syncErrorThrown = true;
                        return true;
                    }
                    return false;
                }
                _unsubscribe() {
                    const { _parent } = this;
                    this._context = null;
                    this._parent = null;
                    _parent.unsubscribe();
                }
            }
        }
    }
});
