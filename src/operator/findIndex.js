System.register(['./find'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var find_1;
    function findIndex(predicate, thisArg) {
        return this.lift(new find_1.FindValueOperator(predicate, this, true, thisArg));
    }
    exports_1("findIndex", findIndex);
    return {
        setters:[
            function (find_1_1) {
                find_1 = find_1_1;
            }],
        execute: function() {
        }
    }
});
