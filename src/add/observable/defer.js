System.register(['../../Observable', '../../observable/DeferObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, DeferObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (DeferObservable_1_1) {
                DeferObservable_1 = DeferObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.defer = DeferObservable_1.DeferObservable.create;
        }
    }
});
