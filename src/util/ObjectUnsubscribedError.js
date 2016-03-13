System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ObjectUnsubscribedError;
    return {
        setters:[],
        execute: function() {
            class ObjectUnsubscribedError extends Error {
                constructor() {
                    super('object unsubscribed');
                    this.name = 'ObjectUnsubscribedError';
                }
            }
            exports_1("ObjectUnsubscribedError", ObjectUnsubscribedError);
        }
    }
});
