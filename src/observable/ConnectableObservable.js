System.register(['../Observable', '../Subscriber', '../Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, Subscriber_1, Subscription_1;
    var ConnectableObservable, ConnectableSubscription, RefCountObservable, RefCountSubscriber;
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
            }],
        execute: function() {
            class ConnectableObservable extends Observable_1.Observable {
                constructor(source, subjectFactory) {
                    super();
                    this.source = source;
                    this.subjectFactory = subjectFactory;
                }
                _subscribe(subscriber) {
                    return this.getSubject().subscribe(subscriber);
                }
                getSubject() {
                    const subject = this.subject;
                    if (subject && !subject.isUnsubscribed) {
                        return subject;
                    }
                    return (this.subject = this.subjectFactory());
                }
                connect() {
                    const source = this.source;
                    let subscription = this.subscription;
                    if (subscription && !subscription.isUnsubscribed) {
                        return subscription;
                    }
                    subscription = source.subscribe(this.getSubject());
                    subscription.add(new ConnectableSubscription(this));
                    return (this.subscription = subscription);
                }
                refCount() {
                    return new RefCountObservable(this);
                }
                _closeSubscription() {
                    this.subject = null;
                    this.subscription = null;
                }
            }
            exports_1("ConnectableObservable", ConnectableObservable);
            class ConnectableSubscription extends Subscription_1.Subscription {
                constructor(connectable) {
                    super();
                    this.connectable = connectable;
                }
                _unsubscribe() {
                    const connectable = this.connectable;
                    connectable._closeSubscription();
                    this.connectable = null;
                }
            }
            class RefCountObservable extends Observable_1.Observable {
                constructor(connectable, refCount = 0) {
                    super();
                    this.connectable = connectable;
                    this.refCount = refCount;
                }
                _subscribe(subscriber) {
                    const connectable = this.connectable;
                    const refCountSubscriber = new RefCountSubscriber(subscriber, this);
                    const subscription = connectable.subscribe(refCountSubscriber);
                    if (!subscription.isUnsubscribed && ++this.refCount === 1) {
                        refCountSubscriber.connection = this.connection = connectable.connect();
                    }
                    return subscription;
                }
            }
            class RefCountSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, refCountObservable) {
                    super(null);
                    this.destination = destination;
                    this.refCountObservable = refCountObservable;
                    this.connection = refCountObservable.connection;
                    destination.add(this);
                }
                _next(value) {
                    this.destination.next(value);
                }
                _error(err) {
                    this._resetConnectable();
                    this.destination.error(err);
                }
                _complete() {
                    this._resetConnectable();
                    this.destination.complete();
                }
                _resetConnectable() {
                    const observable = this.refCountObservable;
                    const obsConnection = observable.connection;
                    const subConnection = this.connection;
                    if (subConnection && subConnection === obsConnection) {
                        observable.refCount = 0;
                        obsConnection.unsubscribe();
                        observable.connection = null;
                        this.unsubscribe();
                    }
                }
                _unsubscribe() {
                    const observable = this.refCountObservable;
                    if (observable.refCount === 0) {
                        return;
                    }
                    if (--observable.refCount === 0) {
                        const obsConnection = observable.connection;
                        const subConnection = this.connection;
                        if (subConnection && subConnection === obsConnection) {
                            obsConnection.unsubscribe();
                            observable.connection = null;
                        }
                    }
                }
            }
        }
    }
});
