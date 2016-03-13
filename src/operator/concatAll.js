System.register(['./mergeAll'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mergeAll_1;
    function concatAll() {
        return this.lift(new mergeAll_1.MergeAllOperator(1));
    }
    exports_1("concatAll", concatAll);
    return {
        setters:[
            function (mergeAll_1_1) {
                mergeAll_1 = mergeAll_1_1;
            }],
        execute: function() {
        }
    }
});
