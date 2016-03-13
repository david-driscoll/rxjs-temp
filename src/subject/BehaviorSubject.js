System.register(['../Subject', '../util/throwError', '../util/ObjectUnsubscribedError'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, throwError_1, ObjectUnsubscribedError_1;
    var BehaviorSubject;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (throwError_1_1) {
                throwError_1 = throwError_1_1;
            },
            function (ObjectUnsubscribedError_1_1) {
                ObjectUnsubscribedError_1 = ObjectUnsubscribedError_1_1;
            }],
        execute: function() {
            class BehaviorSubject extends Subject_1.Subject {
                constructor(_value) {
                    super();
                    this._value = _value;
                }
                getValue() {
                    if (this.hasErrored) {
                        throwError_1.throwError(this.errorValue);
                    }
                    else if (this.isUnsubscribed) {
                        throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
                    }
                    else {
                        return this._value;
                    }
                }
                get value() {
                    return this.getValue();
                }
                _subscribe(subscriber) {
                    const subscription = super._subscribe(subscriber);
                    if (subscription && !subscription.isUnsubscribed) {
                        subscriber.next(this._value);
                    }
                    return subscription;
                }
                _next(value) {
                    super._next(this._value = value);
                }
                _error(err) {
                    this.hasErrored = true;
                    super._error(this.errorValue = err);
                }
            }
            exports_1("BehaviorSubject", BehaviorSubject);
        }
    }
});
