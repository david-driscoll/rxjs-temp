System.register(['./FutureAction', '../util/AnimationFrame'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FutureAction_1, AnimationFrame_1;
    var AnimationFrameAction;
    return {
        setters:[
            function (FutureAction_1_1) {
                FutureAction_1 = FutureAction_1_1;
            },
            function (AnimationFrame_1_1) {
                AnimationFrame_1 = AnimationFrame_1_1;
            }],
        execute: function() {
            class AnimationFrameAction extends FutureAction_1.FutureAction {
                _schedule(state, delay = 0) {
                    if (delay > 0) {
                        return super._schedule(state, delay);
                    }
                    this.delay = delay;
                    this.state = state;
                    const { scheduler } = this;
                    scheduler.actions.push(this);
                    if (!scheduler.scheduledId) {
                        scheduler.scheduledId = AnimationFrame_1.AnimationFrame.requestAnimationFrame(() => {
                            scheduler.scheduledId = null;
                            scheduler.flush();
                        });
                    }
                    return this;
                }
                _unsubscribe() {
                    const { scheduler } = this;
                    const { scheduledId, actions } = scheduler;
                    super._unsubscribe();
                    if (actions.length === 0) {
                        scheduler.active = false;
                        if (scheduledId != null) {
                            scheduler.scheduledId = null;
                            AnimationFrame_1.AnimationFrame.cancelAnimationFrame(scheduledId);
                        }
                    }
                }
            }
            exports_1("AnimationFrameAction", AnimationFrameAction);
        }
    }
});
