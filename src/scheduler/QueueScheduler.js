System.register(['./QueueAction', './FutureAction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var QueueAction_1, FutureAction_1;
    var QueueScheduler;
    return {
        setters:[
            function (QueueAction_1_1) {
                QueueAction_1 = QueueAction_1_1;
            },
            function (FutureAction_1_1) {
                FutureAction_1 = FutureAction_1_1;
            }],
        execute: function() {
            class QueueScheduler {
                constructor() {
                    this.active = false;
                    this.actions = [];
                    this.scheduledId = null;
                }
                now() {
                    return Date.now();
                }
                flush() {
                    if (this.active || this.scheduledId) {
                        return;
                    }
                    this.active = true;
                    const actions = this.actions;
                    for (let action; action = actions.shift();) {
                        action.execute();
                    }
                    this.active = false;
                }
                schedule(work, delay = 0, state) {
                    return (delay <= 0) ?
                        this.scheduleNow(work, state) :
                        this.scheduleLater(work, delay, state);
                }
                scheduleNow(work, state) {
                    return new QueueAction_1.QueueAction(this, work).schedule(state);
                }
                scheduleLater(work, delay, state) {
                    return new FutureAction_1.FutureAction(this, work).schedule(state, delay);
                }
            }
            exports_1("QueueScheduler", QueueScheduler);
        }
    }
});
