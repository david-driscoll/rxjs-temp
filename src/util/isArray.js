System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isArray;
    return {
        setters:[],
        execute: function() {
            exports_1("isArray", isArray = Array.isArray || ((x) => x && typeof x.length === 'number'));
        }
    }
});
