System.register(['../Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1;
    var IfObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            class IfObservable extends Observable_1.Observable {
                constructor(condition, thenSource, elseSource) {
                    super();
                    this.condition = condition;
                    this.thenSource = thenSource;
                    this.elseSource = elseSource;
                }
                static create(condition, thenSource, elseSource) {
                    return new IfObservable(condition, thenSource, elseSource);
                }
                _subscribe(subscriber) {
                    const { condition, thenSource, elseSource } = this;
                    let result, error, errorHappened = false;
                    try {
                        result = condition();
                    }
                    catch (e) {
                        error = e;
                        errorHappened = true;
                    }
                    if (errorHappened) {
                        subscriber.error(error);
                    }
                    else if (result && thenSource) {
                        return thenSource.subscribe(subscriber);
                    }
                    else if (elseSource) {
                        return elseSource.subscribe(subscriber);
                    }
                    else {
                        subscriber.complete();
                    }
                }
            }
            exports_1("IfObservable", IfObservable);
        }
    }
});
