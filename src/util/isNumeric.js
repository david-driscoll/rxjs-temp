System.register(['../util/isArray'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isArray_1;
    function isNumeric(val) {
        return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
    }
    exports_1("isNumeric", isNumeric);
    return {
        setters:[
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            }],
        execute: function() {
            ;
        }
    }
});
