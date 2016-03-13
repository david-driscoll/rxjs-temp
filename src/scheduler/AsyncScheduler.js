System.register(['./FutureAction', './QueueScheduler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FutureAction_1, QueueScheduler_1;
    var AsyncScheduler;
    return {
        setters:[
            function (FutureAction_1_1) {
                FutureAction_1 = FutureAction_1_1;
            },
            function (QueueScheduler_1_1) {
                QueueScheduler_1 = QueueScheduler_1_1;
            }],
        execute: function() {
            class AsyncScheduler extends QueueScheduler_1.QueueScheduler {
                scheduleNow(work, state) {
                    return new FutureAction_1.FutureAction(this, work).schedule(state, 0);
                }
            }
            exports_1("AsyncScheduler", AsyncScheduler);
        }
    }
});
