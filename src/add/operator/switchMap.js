System.register(['../../Observable', '../../operator/switchMap'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, switchMap_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (switchMap_1_1) {
                switchMap_1 = switchMap_1_1;
            }],
        execute: function() {
            Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
        }
    }
});
