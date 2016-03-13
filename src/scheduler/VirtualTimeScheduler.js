System.register(['../Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscription_1;
    var VirtualTimeScheduler, VirtualAction;
    return {
        setters:[
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }],
        execute: function() {
            class VirtualTimeScheduler {
                constructor() {
                    this.actions = [];
                    this.active = false;
                    this.scheduledId = null;
                    this.index = 0;
                    this.sorted = false;
                    this.frame = 0;
                    this.maxFrames = 750;
                }
                now() {
                    return this.frame;
                }
                flush() {
                    const actions = this.actions;
                    const maxFrames = this.maxFrames;
                    while (actions.length > 0) {
                        let action = actions.shift();
                        this.frame = action.delay;
                        if (this.frame <= maxFrames) {
                            action.execute();
                        }
                        else {
                            break;
                        }
                    }
                    actions.length = 0;
                    this.frame = 0;
                }
                addAction(action) {
                    const actions = this.actions;
                    actions.push(action);
                    actions.sort((a, b) => {
                        if (a.delay === b.delay) {
                            if (a.index === b.index) {
                                return 0;
                            }
                            else if (a.index > b.index) {
                                return 1;
                            }
                            else {
                                return -1;
                            }
                        }
                        else if (a.delay > b.delay) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                }
                schedule(work, delay = 0, state) {
                    this.sorted = false;
                    return new VirtualAction(this, work, this.index++).schedule(state, delay);
                }
            }
            VirtualTimeScheduler.frameTimeFactor = 10;
            exports_1("VirtualTimeScheduler", VirtualTimeScheduler);
            class VirtualAction extends Subscription_1.Subscription {
                constructor(scheduler, work, index) {
                    super();
                    this.scheduler = scheduler;
                    this.work = work;
                    this.index = index;
                    this.calls = 0;
                }
                schedule(state, delay = 0) {
                    if (this.isUnsubscribed) {
                        return this;
                    }
                    const scheduler = this.scheduler;
                    let action;
                    if (this.calls++ === 0) {
                        action = this;
                    }
                    else {
                        action = new VirtualAction(scheduler, this.work, scheduler.index += 1);
                        this.add(action);
                    }
                    action.state = state;
                    action.delay = scheduler.frame + delay;
                    scheduler.addAction(action);
                    return this;
                }
                execute() {
                    if (this.isUnsubscribed) {
                        throw new Error('How did did we execute a canceled Action?');
                    }
                    this.work(this.state);
                }
                unsubscribe() {
                    const actions = this.scheduler.actions;
                    const index = actions.indexOf(this);
                    this.work = void 0;
                    this.state = void 0;
                    this.scheduler = void 0;
                    if (index !== -1) {
                        actions.splice(index, 1);
                    }
                    super.unsubscribe();
                }
            }
        }
    }
});
