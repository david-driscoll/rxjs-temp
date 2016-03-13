System.register(['./reduce'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var reduce_1;
    function max(comparer) {
        const max = (typeof comparer === 'function')
            ? comparer
            : (x, y) => x > y ? x : y;
        return this.lift(new reduce_1.ReduceOperator(max));
    }
    exports_1("max", max);
    return {
        setters:[
            function (reduce_1_1) {
                reduce_1 = reduce_1_1;
            }],
        execute: function() {
        }
    }
});
