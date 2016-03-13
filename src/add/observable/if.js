System.register(['../../Observable', '../../observable/IfObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, IfObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (IfObservable_1_1) {
                IfObservable_1 = IfObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.if = IfObservable_1.IfObservable.create;
        }
    }
});
