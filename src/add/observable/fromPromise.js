System.register(['../../Observable', '../../observable/PromiseObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, PromiseObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (PromiseObservable_1_1) {
                PromiseObservable_1 = PromiseObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.fromPromise = PromiseObservable_1.PromiseObservable.create;
        }
    }
});
