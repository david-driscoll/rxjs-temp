System.register(['./multicast', '../Subject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var multicast_1, Subject_1;
    function shareSubjectFactory() {
        return new Subject_1.Subject();
    }
    function share() {
        return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
    }
    exports_1("share", share);
    return {
        setters:[
            function (multicast_1_1) {
                multicast_1 = multicast_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            ;
        }
    }
});
