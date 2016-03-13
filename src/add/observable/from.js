System.register(['../../Observable', '../../observable/FromObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, FromObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (FromObservable_1_1) {
                FromObservable_1 = FromObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.from = FromObservable_1.FromObservable.create;
        }
    }
});
