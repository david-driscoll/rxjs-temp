System.register(['./AsapAction', './QueueScheduler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AsapAction_1, QueueScheduler_1;
    var AsapScheduler;
    return {
        setters:[
            function (AsapAction_1_1) {
                AsapAction_1 = AsapAction_1_1;
            },
            function (QueueScheduler_1_1) {
                QueueScheduler_1 = QueueScheduler_1_1;
            }],
        execute: function() {
            class AsapScheduler extends QueueScheduler_1.QueueScheduler {
                scheduleNow(work, state) {
                    return new AsapAction_1.AsapAction(this, work).schedule(state);
                }
            }
            exports_1("AsapScheduler", AsapScheduler);
        }
    }
});
