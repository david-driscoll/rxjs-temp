System.register(['../../../Observable', '../../../observable/dom/AjaxObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, AjaxObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (AjaxObservable_1_1) {
                AjaxObservable_1 = AjaxObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.ajax = AjaxObservable_1.AjaxObservable.create;
        }
    }
});
