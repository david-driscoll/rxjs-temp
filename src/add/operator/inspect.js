System.register(['../../Observable', '../../operator/inspect'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, inspect_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (inspect_1_1) {
                inspect_1 = inspect_1_1;
            }],
        execute: function() {
            Observable_1.Observable.prototype.inspect = inspect_1.inspect;
        }
    }
});
