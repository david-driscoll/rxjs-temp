System.register(['./Observable', './Subscriber', './Subscription', './subject/SubjectSubscription', './symbol/rxSubscriber', './util/throwError', './util/ObjectUnsubscribedError'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, Subscriber_1, Subscription_1, SubjectSubscription_1, rxSubscriber_1, throwError_1, ObjectUnsubscribedError_1;
    var Subject, SubjectObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (SubjectSubscription_1_1) {
                SubjectSubscription_1 = SubjectSubscription_1_1;
            },
            function (rxSubscriber_1_1) {
                rxSubscriber_1 = rxSubscriber_1_1;
            },
            function (throwError_1_1) {
                throwError_1 = throwError_1_1;
            },
            function (ObjectUnsubscribedError_1_1) {
                ObjectUnsubscribedError_1 = ObjectUnsubscribedError_1_1;
            }],
        execute: function() {
            class Subject extends Observable_1.Observable {
                constructor(destination, source) {
                    super();
                    this.destination = destination;
                    this.source = source;
                    this.observers = [];
                    this.isUnsubscribed = false;
                    this.isStopped = false;
                    this.hasErrored = false;
                    this.dispatching = false;
                    this.hasCompleted = false;
                    this.source = source;
                }
                lift(operator) {
                    const subject = new Subject(this.destination || this, this);
                    subject.operator = operator;
                    return subject;
                }
                add(subscription) {
                    Subscription_1.Subscription.prototype.add.call(this, subscription);
                }
                remove(subscription) {
                    Subscription_1.Subscription.prototype.remove.call(this, subscription);
                }
                unsubscribe() {
                    Subscription_1.Subscription.prototype.unsubscribe.call(this);
                }
                _subscribe(subscriber) {
                    if (this.source) {
                        return this.source.subscribe(subscriber);
                    }
                    else {
                        if (subscriber.isUnsubscribed) {
                            return;
                        }
                        else if (this.hasErrored) {
                            return subscriber.error(this.errorValue);
                        }
                        else if (this.hasCompleted) {
                            return subscriber.complete();
                        }
                        this.throwIfUnsubscribed();
                        const subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
                        this.observers.push(subscriber);
                        return subscription;
                    }
                }
                _unsubscribe() {
                    this.source = null;
                    this.isStopped = true;
                    this.observers = null;
                    this.destination = null;
                }
                next(value) {
                    this.throwIfUnsubscribed();
                    if (this.isStopped) {
                        return;
                    }
                    this.dispatching = true;
                    this._next(value);
                    this.dispatching = false;
                    if (this.hasErrored) {
                        this._error(this.errorValue);
                    }
                    else if (this.hasCompleted) {
                        this._complete();
                    }
                }
                error(err) {
                    this.throwIfUnsubscribed();
                    if (this.isStopped) {
                        return;
                    }
                    this.isStopped = true;
                    this.hasErrored = true;
                    this.errorValue = err;
                    if (this.dispatching) {
                        return;
                    }
                    this._error(err);
                }
                complete() {
                    this.throwIfUnsubscribed();
                    if (this.isStopped) {
                        return;
                    }
                    this.isStopped = true;
                    this.hasCompleted = true;
                    if (this.dispatching) {
                        return;
                    }
                    this._complete();
                }
                asObservable() {
                    const observable = new SubjectObservable(this);
                    return observable;
                }
                _next(value) {
                    if (this.destination) {
                        this.destination.next(value);
                    }
                    else {
                        this._finalNext(value);
                    }
                }
                _finalNext(value) {
                    let index = -1;
                    const observers = this.observers.slice(0);
                    const len = observers.length;
                    while (++index < len) {
                        observers[index].next(value);
                    }
                }
                _error(err) {
                    if (this.destination) {
                        this.destination.error(err);
                    }
                    else {
                        this._finalError(err);
                    }
                }
                _finalError(err) {
                    let index = -1;
                    const observers = this.observers;
                    this.observers = null;
                    this.isUnsubscribed = true;
                    if (observers) {
                        const len = observers.length;
                        while (++index < len) {
                            observers[index].error(err);
                        }
                    }
                    this.isUnsubscribed = false;
                    this.unsubscribe();
                }
                _complete() {
                    if (this.destination) {
                        this.destination.complete();
                    }
                    else {
                        this._finalComplete();
                    }
                }
                _finalComplete() {
                    let index = -1;
                    const observers = this.observers;
                    this.observers = null;
                    this.isUnsubscribed = true;
                    if (observers) {
                        const len = observers.length;
                        while (++index < len) {
                            observers[index].complete();
                        }
                    }
                    this.isUnsubscribed = false;
                    this.unsubscribe();
                }
                throwIfUnsubscribed() {
                    if (this.isUnsubscribed) {
                        throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
                    }
                }
                [rxSubscriber_1.rxSubscriber]() {
                    return new Subscriber_1.Subscriber(this);
                }
            }
            Subject.create = (destination, source) => {
                return new Subject(destination, source);
            };
            exports_1("Subject", Subject);
            class SubjectObservable extends Observable_1.Observable {
                constructor(source) {
                    super();
                    this.source = source;
                }
            }
        }
    }
});
