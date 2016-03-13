System.register(['../Subject', './multicast'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, multicast_1;
    function publish() {
        return multicast_1.multicast.call(this, new Subject_1.Subject());
    }
    exports_1("publish", publish);
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (multicast_1_1) {
                multicast_1 = multicast_1_1;
            }],
        execute: function() {
        }
    }
});
