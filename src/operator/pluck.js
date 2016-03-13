System.register(['./map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var map_1;
    function pluck(...properties) {
        const length = properties.length;
        if (length === 0) {
            throw new Error('List of properties cannot be empty.');
        }
        return map_1.map.call(this, plucker(properties, length));
    }
    exports_1("pluck", pluck);
    function plucker(props, length) {
        const mapper = (x) => {
            let currentProp = x;
            for (let i = 0; i < length; i++) {
                const p = currentProp[props[i]];
                if (typeof p !== 'undefined') {
                    currentProp = p;
                }
                else {
                    return undefined;
                }
            }
            return currentProp;
        };
        return mapper;
    }
    return {
        setters:[
            function (map_1_1) {
                map_1 = map_1_1;
            }],
        execute: function() {
        }
    }
});
