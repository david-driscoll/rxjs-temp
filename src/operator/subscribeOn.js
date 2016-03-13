System.register(['../observable/SubscribeOnObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SubscribeOnObservable_1;
    function subscribeOn(scheduler, delay = 0) {
        return new SubscribeOnObservable_1.SubscribeOnObservable(this, delay, scheduler);
    }
    exports_1("subscribeOn", subscribeOn);
    return {
        setters:[
            function (SubscribeOnObservable_1_1) {
                SubscribeOnObservable_1 = SubscribeOnObservable_1_1;
            }],
        execute: function() {
        }
    }
});
