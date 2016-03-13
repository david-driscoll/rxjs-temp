System.register(['./distinctUntilChanged'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var distinctUntilChanged_1;
    function distinctUntilKeyChanged(key, compare) {
        return distinctUntilChanged_1.distinctUntilChanged.call(this, function (x, y) {
            if (compare) {
                return compare(x[key], y[key]);
            }
            return x[key] === y[key];
        });
    }
    exports_1("distinctUntilKeyChanged", distinctUntilKeyChanged);
    return {
        setters:[
            function (distinctUntilChanged_1_1) {
                distinctUntilChanged_1 = distinctUntilChanged_1_1;
            }],
        execute: function() {
        }
    }
});
