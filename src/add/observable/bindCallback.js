System.register(['../../Observable', '../../observable/BoundCallbackObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, BoundCallbackObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (BoundCallbackObservable_1_1) {
                BoundCallbackObservable_1 = BoundCallbackObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.bindCallback = BoundCallbackObservable_1.BoundCallbackObservable.create;
        }
    }
});
