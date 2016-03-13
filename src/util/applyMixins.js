System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function applyMixins(derivedCtor, baseCtors) {
        for (let i = 0, len = baseCtors.length; i < len; i++) {
            const baseCtor = baseCtors[i];
            const propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
            for (let j = 0, len2 = propertyKeys.length; j < len2; j++) {
                const name = propertyKeys[j];
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        }
    }
    exports_1("applyMixins", applyMixins);
    return {
        setters:[],
        execute: function() {
        }
    }
});
