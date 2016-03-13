System.register(['../../Observable', '../../observable/IntervalObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, IntervalObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (IntervalObservable_1_1) {
                IntervalObservable_1 = IntervalObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.interval = IntervalObservable_1.IntervalObservable.create;
        }
    }
});
