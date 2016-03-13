System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ArgumentOutOfRangeError;
    return {
        setters:[],
        execute: function() {
            class ArgumentOutOfRangeError extends Error {
                constructor() {
                    super('argument out of range');
                    this.name = 'ArgumentOutOfRangeError';
                }
            }
            exports_1("ArgumentOutOfRangeError", ArgumentOutOfRangeError);
        }
    }
});
