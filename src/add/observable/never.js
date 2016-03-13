System.register(['../../Observable', '../../observable/NeverObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, NeverObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (NeverObservable_1_1) {
                NeverObservable_1 = NeverObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.never = NeverObservable_1.NeverObservable.create;
        }
    }
});
