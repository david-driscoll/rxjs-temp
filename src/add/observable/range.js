System.register(['../../Observable', '../../observable/RangeObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, RangeObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (RangeObservable_1_1) {
                RangeObservable_1 = RangeObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.range = RangeObservable_1.RangeObservable.create;
        }
    }
});
