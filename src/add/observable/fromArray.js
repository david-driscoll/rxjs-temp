System.register(['../../Observable', '../../observable/ArrayObservable', './of'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, ArrayObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (_1) {}],
        execute: function() {
            Observable_1.Observable.fromArray = ArrayObservable_1.ArrayObservable.create;
        }
    }
});
