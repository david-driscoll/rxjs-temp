System.register(['./util/isArray', './util/isObject', './util/isFunction', './util/tryCatch', './util/errorObject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isArray_1, isObject_1, isFunction_1, tryCatch_1, errorObject_1;
    var Subscription, UnsubscriptionError;
    return {
        setters:[
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (isObject_1_1) {
                isObject_1 = isObject_1_1;
            },
            function (isFunction_1_1) {
                isFunction_1 = isFunction_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            }],
        execute: function() {
            class Subscription {
                constructor(_unsubscribe) {
                    this.isUnsubscribed = false;
                    if (_unsubscribe) {
                        this._unsubscribe = _unsubscribe;
                    }
                }
                unsubscribe() {
                    let hasErrors = false;
                    let errors;
                    if (this.isUnsubscribed) {
                        return;
                    }
                    this.isUnsubscribed = true;
                    const { _unsubscribe, _subscriptions } = this;
                    this._subscriptions = null;
                    if (isFunction_1.isFunction(_unsubscribe)) {
                        let trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
                        if (trial === errorObject_1.errorObject) {
                            hasErrors = true;
                            (errors = errors || []).push(errorObject_1.errorObject.e);
                        }
                    }
                    if (isArray_1.isArray(_subscriptions)) {
                        let index = -1;
                        const len = _subscriptions.length;
                        while (++index < len) {
                            const sub = _subscriptions[index];
                            if (isObject_1.isObject(sub)) {
                                let trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                                if (trial === errorObject_1.errorObject) {
                                    hasErrors = true;
                                    errors = errors || [];
                                    let err = errorObject_1.errorObject.e;
                                    if (err instanceof UnsubscriptionError) {
                                        errors = errors.concat(err.errors);
                                    }
                                    else {
                                        errors.push(err);
                                    }
                                }
                            }
                        }
                    }
                    if (hasErrors) {
                        throw new UnsubscriptionError(errors);
                    }
                }
                add(subscription) {
                    if (!subscription || (subscription === this) || (subscription === Subscription.EMPTY)) {
                        return;
                    }
                    let sub = subscription;
                    switch (typeof subscription) {
                        case 'function':
                            sub = new Subscription(subscription);
                        case 'object':
                            if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
                                break;
                            }
                            else if (this.isUnsubscribed) {
                                sub.unsubscribe();
                            }
                            else {
                                (this._subscriptions || (this._subscriptions = [])).push(sub);
                            }
                            break;
                        default:
                            throw new Error('Unrecognized subscription ' + subscription + ' added to Subscription.');
                    }
                }
                remove(subscription) {
                    if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
                        return;
                    }
                    const subscriptions = this._subscriptions;
                    if (subscriptions) {
                        const subscriptionIndex = subscriptions.indexOf(subscription);
                        if (subscriptionIndex !== -1) {
                            subscriptions.splice(subscriptionIndex, 1);
                        }
                    }
                }
            }
            Subscription.EMPTY = (function (empty) {
                empty.isUnsubscribed = true;
                return empty;
            }(new Subscription()));
            exports_1("Subscription", Subscription);
            class UnsubscriptionError extends Error {
                constructor(errors) {
                    super('unsubscriptoin error(s)');
                    this.errors = errors;
                    this.name = 'UnsubscriptionError';
                }
            }
            exports_1("UnsubscriptionError", UnsubscriptionError);
        }
    }
});
