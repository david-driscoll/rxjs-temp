System.register(['./mergeMapTo'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mergeMapTo_1;
    function concatMapTo(observable, resultSelector) {
        return this.lift(new mergeMapTo_1.MergeMapToOperator(observable, resultSelector, 1));
    }
    exports_1("concatMapTo", concatMapTo);
    return {
        setters:[
            function (mergeMapTo_1_1) {
                mergeMapTo_1 = mergeMapTo_1_1;
            }],
        execute: function() {
        }
    }
});
