System.register(['../../Observable', '../../observable/ForkJoinObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, ForkJoinObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (ForkJoinObservable_1_1) {
                ForkJoinObservable_1 = ForkJoinObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.forkJoin = ForkJoinObservable_1.ForkJoinObservable.create;
        }
    }
});
