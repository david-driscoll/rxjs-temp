System.register(['./root'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1;
    var Object, assign;
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            }],
        execute: function() {
            Object = root_1.root.Object;
            if (typeof Object.assign != 'function') {
                (function () {
                    Object.assign = function assignPolyfill(target, ...sources) {
                        if (target === undefined || target === null) {
                            throw new TypeError('Cannot convert undefined or null to object');
                        }
                        const output = Object(target);
                        const len = sources.length;
                        for (let index = 0; index < len; index++) {
                            let source = sources[index];
                            if (source !== undefined && source !== null) {
                                for (let key in source) {
                                    if (source.hasOwnProperty(key)) {
                                        output[key] = source[key];
                                    }
                                }
                            }
                        }
                        return output;
                    };
                })();
            }
            exports_1("assign", assign = Object.assign);
        }
    }
});
