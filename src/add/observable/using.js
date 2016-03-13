System.register(['../../Observable', '../../observable/UsingObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, UsingObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (UsingObservable_1_1) {
                UsingObservable_1 = UsingObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.using = UsingObservable_1.UsingObservable.create;
        }
    }
});
