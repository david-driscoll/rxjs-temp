System.register(['../../Subject', '../../Subscriber', '../../Observable', '../../Subscription', '../../util/root', '../../subject/ReplaySubject', '../../util/tryCatch', '../../util/errorObject', '../../util/assign'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, Subscriber_1, Observable_1, Subscription_1, root_1, ReplaySubject_1, tryCatch_1, errorObject_1, assign_1;
    var WebSocketSubject;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (ReplaySubject_1_1) {
                ReplaySubject_1 = ReplaySubject_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (assign_1_1) {
                assign_1 = assign_1_1;
            }],
        execute: function() {
            class WebSocketSubject extends Subject_1.Subject {
                constructor(urlConfigOrSource, destination) {
                    if (urlConfigOrSource instanceof Observable_1.Observable) {
                        super(destination, urlConfigOrSource);
                    }
                    else {
                        super();
                        this.WebSocketCtor = root_1.root.WebSocket;
                        if (typeof urlConfigOrSource === 'string') {
                            this.url = urlConfigOrSource;
                        }
                        else {
                            assign_1.assign(this, urlConfigOrSource);
                        }
                        if (!this.WebSocketCtor) {
                            throw new Error('no WebSocket constructor can be found');
                        }
                        this.destination = new ReplaySubject_1.ReplaySubject();
                    }
                }
                resultSelector(e) {
                    return JSON.parse(e.data);
                }
                static create(urlConfigOrSource) {
                    return new WebSocketSubject(urlConfigOrSource);
                }
                lift(operator) {
                    const sock = new WebSocketSubject(this, this.destination);
                    sock.operator = operator;
                    return sock;
                }
                multiplex(subMsg, unsubMsg, messageFilter) {
                    const self = this;
                    return new Observable_1.Observable((observer) => {
                        const result = tryCatch_1.tryCatch(subMsg)();
                        if (result === errorObject_1.errorObject) {
                            observer.error(errorObject_1.errorObject.e);
                        }
                        else {
                            self.next(result);
                        }
                        let subscription = self.subscribe(x => {
                            const result = tryCatch_1.tryCatch(messageFilter)(x);
                            if (result === errorObject_1.errorObject) {
                                observer.error(errorObject_1.errorObject.e);
                            }
                            else if (result) {
                                observer.next(x);
                            }
                        }, err => observer.error(err), () => observer.complete());
                        return () => {
                            const result = tryCatch_1.tryCatch(unsubMsg)();
                            if (result === errorObject_1.errorObject) {
                                observer.error(errorObject_1.errorObject.e);
                            }
                            else {
                                self.next(result);
                            }
                            subscription.unsubscribe();
                        };
                    });
                }
                _unsubscribe() {
                    this.socket = null;
                    this.source = null;
                    this.destination = new ReplaySubject_1.ReplaySubject();
                    this.isStopped = false;
                    this.hasErrored = false;
                    this.hasCompleted = false;
                    this.observers = null;
                    this.isUnsubscribed = false;
                }
                _subscribe(subscriber) {
                    if (!this.observers) {
                        this.observers = [];
                    }
                    const subscription = super._subscribe(subscriber);
                    const self = this;
                    const WebSocket = this.WebSocketCtor;
                    if (self.source || !subscription || subscription.isUnsubscribed) {
                        return subscription;
                    }
                    if (self.url && !self.socket) {
                        const socket = self.protocol ? new WebSocket(self.url, self.protocol) : new WebSocket(self.url);
                        self.socket = socket;
                        socket.onopen = (e) => {
                            const openObserver = self.openObserver;
                            if (openObserver) {
                                openObserver.next(e);
                            }
                            const queue = self.destination;
                            self.destination = Subscriber_1.Subscriber.create((x) => socket.readyState === 1 && socket.send(x), (e) => {
                                const closingObserver = self.closingObserver;
                                if (closingObserver) {
                                    closingObserver.next(undefined);
                                }
                                if (e && e.code) {
                                    socket.close(e.code, e.reason);
                                }
                                else {
                                    self._finalError(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' +
                                        'and an optional reason: { code: number, reason: string }'));
                                }
                            }, () => {
                                const closingObserver = self.closingObserver;
                                if (closingObserver) {
                                    closingObserver.next(undefined);
                                }
                                socket.close();
                            });
                            if (queue && queue instanceof ReplaySubject_1.ReplaySubject) {
                                subscription.add(queue.subscribe(self.destination));
                            }
                        };
                        socket.onerror = (e) => self.error(e);
                        socket.onclose = (e) => {
                            const closeObserver = self.closeObserver;
                            if (closeObserver) {
                                closeObserver.next(e);
                            }
                            if (e.wasClean) {
                                self._finalComplete();
                            }
                            else {
                                self._finalError(e);
                            }
                        };
                        socket.onmessage = (e) => {
                            const result = tryCatch_1.tryCatch(self.resultSelector)(e);
                            if (result === errorObject_1.errorObject) {
                                self._finalError(errorObject_1.errorObject.e);
                            }
                            else {
                                self._finalNext(result);
                            }
                        };
                    }
                    return new Subscription_1.Subscription(() => {
                        subscription.unsubscribe();
                        if (!this.observers || this.observers.length === 0) {
                            const { socket } = this;
                            if (socket && socket.readyState < 2) {
                                socket.close();
                            }
                            this.socket = undefined;
                            this.source = undefined;
                            this.destination = new ReplaySubject_1.ReplaySubject();
                        }
                    });
                }
            }
            exports_1("WebSocketSubject", WebSocketSubject);
        }
    }
});
