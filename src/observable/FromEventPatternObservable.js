System.register(['../Observable', '../Subscription', '../util/tryCatch', '../util/errorObject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, Subscription_1, tryCatch_1, errorObject_1;
    var FromEventPatternObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            }],
        execute: function() {
            class FromEventPatternObservable extends Observable_1.Observable {
                constructor(addHandler, removeHandler, selector) {
                    super();
                    this.addHandler = addHandler;
                    this.removeHandler = removeHandler;
                    this.selector = selector;
                }
                static create(addHandler, removeHandler, selector) {
                    return new FromEventPatternObservable(addHandler, removeHandler, selector);
                }
                _subscribe(subscriber) {
                    const addHandler = this.addHandler;
                    const removeHandler = this.removeHandler;
                    const selector = this.selector;
                    const handler = selector ? function (e) {
                        let result = tryCatch_1.tryCatch(selector).apply(null, arguments);
                        if (result === errorObject_1.errorObject) {
                            subscriber.error(result.e);
                        }
                        else {
                            subscriber.next(result);
                        }
                    } : function (e) { subscriber.next(e); };
                    let result = tryCatch_1.tryCatch(addHandler)(handler);
                    if (result === errorObject_1.errorObject) {
                        subscriber.error(result.e);
                    }
                    subscriber.add(new Subscription_1.Subscription(() => {
                        removeHandler(handler);
                    }));
                }
            }
            exports_1("FromEventPatternObservable", FromEventPatternObservable);
        }
    }
});
