System.register(['./mergeMap'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mergeMap_1;
    function concatMap(project, resultSelector) {
        return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
    }
    exports_1("concatMap", concatMap);
    return {
        setters:[
            function (mergeMap_1_1) {
                mergeMap_1 = mergeMap_1_1;
            }],
        execute: function() {
        }
    }
});
