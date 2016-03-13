System.register(['../Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1;
    var UsingObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            class UsingObservable extends Observable_1.Observable {
                constructor(resourceFactory, observableFactory) {
                    super();
                    this.resourceFactory = resourceFactory;
                    this.observableFactory = observableFactory;
                }
                static create(resourceFactory, observableFactory) {
                    return new UsingObservable(resourceFactory, observableFactory);
                }
                _subscribe(subscriber) {
                    const { resourceFactory, observableFactory } = this;
                    let resource, source, error, errorHappened = false;
                    try {
                        resource = resourceFactory();
                    }
                    catch (e) {
                        error = e;
                        errorHappened = true;
                    }
                    if (errorHappened) {
                        subscriber.error(error);
                    }
                    else {
                        subscriber.add(resource);
                        try {
                            source = observableFactory(resource);
                        }
                        catch (e) {
                            error = e;
                            errorHappened = true;
                        }
                        if (errorHappened) {
                            subscriber.error(error);
                        }
                        else {
                            return source.subscribe(subscriber);
                        }
                    }
                }
            }
            exports_1("UsingObservable", UsingObservable);
        }
    }
});
