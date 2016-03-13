System.register(['../subject/BehaviorSubject', './multicast'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BehaviorSubject_1, multicast_1;
    function publishBehavior(value) {
        return multicast_1.multicast.call(this, new BehaviorSubject_1.BehaviorSubject(value));
    }
    exports_1("publishBehavior", publishBehavior);
    return {
        setters:[
            function (BehaviorSubject_1_1) {
                BehaviorSubject_1 = BehaviorSubject_1_1;
            },
            function (multicast_1_1) {
                multicast_1 = multicast_1_1;
            }],
        execute: function() {
        }
    }
});
