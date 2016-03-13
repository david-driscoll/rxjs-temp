System.register(['./distinct'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var distinct_1;
    function distinctKey(key, compare, flushes) {
        return distinct_1.distinct.call(this, function (x, y) {
            if (compare) {
                return compare(x[key], y[key]);
            }
            return x[key] === y[key];
        }, flushes);
    }
    exports_1("distinctKey", distinctKey);
    return {
        setters:[
            function (distinct_1_1) {
                distinct_1 = distinct_1_1;
            }],
        execute: function() {
        }
    }
});
