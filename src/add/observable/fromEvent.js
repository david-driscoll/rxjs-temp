System.register(['../../Observable', '../../observable/FromEventObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, FromEventObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (FromEventObservable_1_1) {
                FromEventObservable_1 = FromEventObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.fromEvent = FromEventObservable_1.FromEventObservable.create;
        }
    }
});
