System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FastMap;
    return {
        setters:[],
        execute: function() {
            class FastMap {
                constructor() {
                    this.values = {};
                }
                delete(key) {
                    this.values[key] = null;
                    return true;
                }
                set(key, value) {
                    this.values[key] = value;
                    return this;
                }
                get(key) {
                    return this.values[key];
                }
                forEach(cb, thisArg) {
                    const values = this.values;
                    for (let key in values) {
                        if (values.hasOwnProperty(key) && values[key] !== null) {
                            cb.call(thisArg, values[key], key);
                        }
                    }
                }
                clear() {
                    this.values = {};
                }
            }
            exports_1("FastMap", FastMap);
        }
    }
});
