System.register(['../../Observable', '../../operator/sample'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, sample_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (sample_1_1) {
                sample_1 = sample_1_1;
            }],
        execute: function() {
            Observable_1.Observable.prototype.sample = sample_1.sample;
        }
    }
});
