System.register(['./QueueScheduler', './AnimationFrameAction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var QueueScheduler_1, AnimationFrameAction_1;
    var AnimationFrameScheduler;
    return {
        setters:[
            function (QueueScheduler_1_1) {
                QueueScheduler_1 = QueueScheduler_1_1;
            },
            function (AnimationFrameAction_1_1) {
                AnimationFrameAction_1 = AnimationFrameAction_1_1;
            }],
        execute: function() {
            class AnimationFrameScheduler extends QueueScheduler_1.QueueScheduler {
                scheduleNow(work, state) {
                    return new AnimationFrameAction_1.AnimationFrameAction(this, work).schedule(state);
                }
            }
            exports_1("AnimationFrameScheduler", AnimationFrameScheduler);
        }
    }
});
