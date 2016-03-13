System.register(['./Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1;
    var Notification;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            class Notification {
                constructor(kind, value, exception) {
                    this.kind = kind;
                    this.value = value;
                    this.exception = exception;
                    this.hasValue = kind === 'N';
                }
                observe(observer) {
                    switch (this.kind) {
                        case 'N':
                            return observer.next && observer.next(this.value);
                        case 'E':
                            return observer.error && observer.error(this.exception);
                        case 'C':
                            return observer.complete && observer.complete();
                    }
                }
                do(next, error, complete) {
                    const kind = this.kind;
                    switch (kind) {
                        case 'N':
                            return next && next(this.value);
                        case 'E':
                            return error && error(this.exception);
                        case 'C':
                            return complete && complete();
                    }
                }
                accept(nextOrObserver, error, complete) {
                    if (nextOrObserver && typeof nextOrObserver.next === 'function') {
                        return this.observe(nextOrObserver);
                    }
                    else {
                        return this.do(nextOrObserver, error, complete);
                    }
                }
                toObservable() {
                    const kind = this.kind;
                    switch (kind) {
                        case 'N':
                            return Observable_1.Observable.of(this.value);
                        case 'E':
                            return Observable_1.Observable.throw(this.exception);
                        case 'C':
                            return Observable_1.Observable.empty();
                    }
                }
                static createNext(value) {
                    if (typeof value !== 'undefined') {
                        return new Notification('N', value);
                    }
                    return this.undefinedValueNotification;
                }
                static createError(err) {
                    return new Notification('E', undefined, err);
                }
                static createComplete() {
                    return this.completeNotification;
                }
            }
            Notification.completeNotification = new Notification('C');
            Notification.undefinedValueNotification = new Notification('N', undefined);
            exports_1("Notification", Notification);
        }
    }
});
