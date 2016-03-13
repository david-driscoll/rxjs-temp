System.register(['../util/Immediate', './FutureAction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Immediate_1, FutureAction_1;
    var AsapAction;
    return {
        setters:[
            function (Immediate_1_1) {
                Immediate_1 = Immediate_1_1;
            },
            function (FutureAction_1_1) {
                FutureAction_1 = FutureAction_1_1;
            }],
        execute: function() {
            class AsapAction extends FutureAction_1.FutureAction {
                _schedule(state, delay = 0) {
                    if (delay > 0) {
                        return super._schedule(state, delay);
                    }
                    this.delay = delay;
                    this.state = state;
                    const { scheduler } = this;
                    scheduler.actions.push(this);
                    if (!scheduler.scheduledId) {
                        scheduler.scheduledId = Immediate_1.Immediate.setImmediate(() => {
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
                            Immediate_1.Immediate.clearImmediate(scheduledId);
                        }
                    }
                }
            }
            exports_1("AsapAction", AsapAction);
        }
    }
});
