System.register(['../Observable', '../util/noop'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, noop_1;
    var NeverObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (noop_1_1) {
                noop_1 = noop_1_1;
            }],
        execute: function() {
            class NeverObservable extends Observable_1.Observable {
                constructor() {
                    super();
                }
                static create() {
                    return new NeverObservable();
                }
                _subscribe(subscriber) {
                    noop_1.noop();
                }
            }
            exports_1("NeverObservable", NeverObservable);
        }
    }
});
