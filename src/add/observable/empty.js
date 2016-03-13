System.register(['../../Observable', '../../observable/EmptyObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, EmptyObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.empty = EmptyObservable_1.EmptyObservable.create;
        }
    }
});
