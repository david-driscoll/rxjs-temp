System.register(['../Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1;
    var ErrorObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            class ErrorObservable extends Observable_1.Observable {
                constructor(error, scheduler) {
                    super();
                    this.error = error;
                    this.scheduler = scheduler;
                }
                static create(error, scheduler) {
                    return new ErrorObservable(error, scheduler);
                }
                static dispatch({ error, subscriber }) {
                    subscriber.error(error);
                }
                _subscribe(subscriber) {
                    const error = this.error;
                    const scheduler = this.scheduler;
                    if (scheduler) {
                        return scheduler.schedule(ErrorObservable.dispatch, 0, {
                            error: error, subscriber: subscriber
                        });
                    }
                    else {
                        subscriber.error(error);
                    }
                }
            }
            exports_1("ErrorObservable", ErrorObservable);
        }
    }
});
