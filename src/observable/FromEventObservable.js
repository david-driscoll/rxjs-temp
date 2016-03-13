System.register(['../Observable', '../util/tryCatch', '../util/errorObject', '../Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, tryCatch_1, errorObject_1, Subscription_1;
    var FromEventObservable;
    function isNodeStyleEventEmmitter(sourceObj) {
        return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
    }
    function isJQueryStyleEventEmitter(sourceObj) {
        return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
    }
    function isNodeList(sourceObj) {
        return !!sourceObj && sourceObj.toString() === '[object NodeList]';
    }
    function isHTMLCollection(sourceObj) {
        return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
    }
    function isEventTarget(sourceObj) {
        return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
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
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }],
        execute: function() {
            class FromEventObservable extends Observable_1.Observable {
                constructor(sourceObj, eventName, selector) {
                    super();
                    this.sourceObj = sourceObj;
                    this.eventName = eventName;
                    this.selector = selector;
                }
                static create(sourceObj, eventName, selector) {
                    return new FromEventObservable(sourceObj, eventName, selector);
                }
                static setupSubscription(sourceObj, eventName, handler, subscriber) {
                    let unsubscribe;
                    if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
                        for (let i = 0, len = sourceObj.length; i < len; i++) {
                            FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
                        }
                    }
                    else if (isEventTarget(sourceObj)) {
                        sourceObj.addEventListener(eventName, handler);
                        unsubscribe = () => sourceObj.removeEventListener(eventName, handler);
                    }
                    else if (isJQueryStyleEventEmitter(sourceObj)) {
                        sourceObj.on(eventName, handler);
                        unsubscribe = () => sourceObj.off(eventName, handler);
                    }
                    else if (isNodeStyleEventEmmitter(sourceObj)) {
                        sourceObj.addListener(eventName, handler);
                        unsubscribe = () => sourceObj.removeListener(eventName, handler);
                    }
                    subscriber.add(new Subscription_1.Subscription(unsubscribe));
                }
                _subscribe(subscriber) {
                    const sourceObj = this.sourceObj;
                    const eventName = this.eventName;
                    const selector = this.selector;
                    let handler = selector ? (...args) => {
                        let result = tryCatch_1.tryCatch(selector)(...args);
                        if (result === errorObject_1.errorObject) {
                            subscriber.error(errorObject_1.errorObject.e);
                        }
                        else {
                            subscriber.next(result);
                        }
                    } : (e) => subscriber.next(e);
                    FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
                }
            }
            exports_1("FromEventObservable", FromEventObservable);
        }
    }
});
