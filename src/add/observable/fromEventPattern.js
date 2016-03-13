System.register(['../../Observable', '../../observable/FromEventPatternObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, FromEventPatternObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (FromEventPatternObservable_1_1) {
                FromEventPatternObservable_1 = FromEventPatternObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.fromEventPattern = FromEventPatternObservable_1.FromEventPatternObservable.create;
        }
    }
});
