System.register(['../../Observable', '../../observable/ErrorObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, ErrorObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (ErrorObservable_1_1) {
                ErrorObservable_1 = ErrorObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.throw = ErrorObservable_1.ErrorObservable.create;
        }
    }
});
