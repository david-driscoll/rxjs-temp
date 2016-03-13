System.register(['./publishReplay'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var publishReplay_1;
    function cache(bufferSize = Number.POSITIVE_INFINITY, windowTime = Number.POSITIVE_INFINITY, scheduler) {
        return publishReplay_1.publishReplay.call(this, bufferSize, windowTime, scheduler).refCount();
    }
    exports_1("cache", cache);
    return {
        setters:[
            function (publishReplay_1_1) {
                publishReplay_1 = publishReplay_1_1;
            }],
        execute: function() {
        }
    }
});
