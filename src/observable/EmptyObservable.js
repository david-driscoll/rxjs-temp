System.register(['../Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1;
    var EmptyObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            class EmptyObservable extends Observable_1.Observable {
                constructor(scheduler) {
                    super();
                    this.scheduler = scheduler;
                }
                static create(scheduler) {
                    return new EmptyObservable(scheduler);
                }
                static dispatch({ subscriber }) {
                    subscriber.complete();
                }
                _subscribe(subscriber) {
                    const scheduler = this.scheduler;
                    if (scheduler) {
                        return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
                    }
                    else {
                        subscriber.complete();
                    }
                }
            }
            exports_1("EmptyObservable", EmptyObservable);
        }
    }
});
