System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SubscriptionLog;
    return {
        setters:[],
        execute: function() {
            class SubscriptionLog {
                constructor(subscribedFrame, unsubscribedFrame = Number.POSITIVE_INFINITY) {
                    this.subscribedFrame = subscribedFrame;
                    this.unsubscribedFrame = unsubscribedFrame;
                }
            }
            exports_1("SubscriptionLog", SubscriptionLog);
        }
    }
});
