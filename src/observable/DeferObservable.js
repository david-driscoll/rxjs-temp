System.register(['../Observable', '../util/tryCatch', '../util/errorObject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, tryCatch_1, errorObject_1;
    var DeferObservable;
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
            }],
        execute: function() {
            class DeferObservable extends Observable_1.Observable {
                constructor(observableFactory) {
                    super();
                    this.observableFactory = observableFactory;
                }
                static create(observableFactory) {
                    return new DeferObservable(observableFactory);
                }
                _subscribe(subscriber) {
                    const result = tryCatch_1.tryCatch(this.observableFactory)();
                    if (result === errorObject_1.errorObject) {
                        subscriber.error(errorObject_1.errorObject.e);
                    }
                    else {
                        result.subscribe(subscriber);
                    }
                }
            }
            exports_1("DeferObservable", DeferObservable);
        }
    }
});
