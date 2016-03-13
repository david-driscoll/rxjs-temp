System.register(['./FutureAction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FutureAction_1;
    var QueueAction;
    return {
        setters:[
            function (FutureAction_1_1) {
                FutureAction_1 = FutureAction_1_1;
            }],
        execute: function() {
            class QueueAction extends FutureAction_1.FutureAction {
                _schedule(state, delay = 0) {
                    if (delay > 0) {
                        return super._schedule(state, delay);
                    }
                    this.delay = delay;
                    this.state = state;
                    const scheduler = this.scheduler;
                    scheduler.actions.push(this);
                    scheduler.flush();
                    return this;
                }
            }
            exports_1("QueueAction", QueueAction);
        }
    }
});
