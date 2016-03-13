System.register(['../../Observable', '../../observable/BoundNodeCallbackObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, BoundNodeCallbackObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (BoundNodeCallbackObservable_1_1) {
                BoundNodeCallbackObservable_1 = BoundNodeCallbackObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.bindNodeCallback = BoundNodeCallbackObservable_1.BoundNodeCallbackObservable.create;
        }
    }
});
