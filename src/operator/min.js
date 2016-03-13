System.register(['./reduce'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var reduce_1;
    function min(comparer) {
        const min = (typeof comparer === 'function')
            ? comparer
            : (x, y) => x < y ? x : y;
        return this.lift(new reduce_1.ReduceOperator(min));
    }
    exports_1("min", min);
    return {
        setters:[
            function (reduce_1_1) {
                reduce_1 = reduce_1_1;
            }],
        execute: function() {
        }
    }
});
