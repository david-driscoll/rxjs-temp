System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EmptyError;
    return {
        setters:[],
        execute: function() {
            class EmptyError extends Error {
                constructor() {
                    super('no elements in sequence');
                    this.name = 'EmptyError';
                }
            }
            exports_1("EmptyError", EmptyError);
        }
    }
});
