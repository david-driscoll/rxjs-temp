System.register(['../util/root', '../Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1, Subscription_1;
    var FutureAction;
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }],
        execute: function() {
            class FutureAction extends Subscription_1.Subscription {
                constructor(scheduler, work) {
                    super();
                    this.scheduler = scheduler;
                    this.work = work;
                    this.pending = false;
                }
                execute() {
                    if (this.isUnsubscribed) {
                        throw new Error('How did did we execute a canceled Action?');
                    }
                    else {
                        try {
                            this.work(this.state);
                        }
                        catch (e) {
                            this.unsubscribe();
                            throw e;
                        }
                    }
                }
                schedule(state, delay = 0) {
                    if (this.isUnsubscribed) {
                        return this;
                    }
                    return this._schedule(state, delay);
                }
                _schedule(state, delay = 0) {
                    this.state = state;
                    this.pending = true;
                    const id = this.id;
                    if (id != null && this.delay === delay) {
                        return this;
                    }
                    this.delay = delay;
                    if (id != null) {
                        this.id = null;
                        root_1.root.clearInterval(id);
                    }
                    this.id = root_1.root.setInterval(() => {
                        this.pending = false;
                        const { id, scheduler } = this;
                        scheduler.actions.push(this);
                        scheduler.flush();
                        if (this.pending === false && id != null) {
                            this.id = null;
                            root_1.root.clearInterval(id);
                        }
                    }, delay);
                    return this;
                }
                _unsubscribe() {
                    this.pending = false;
                    const { id, scheduler } = this;
                    const { actions } = scheduler;
                    const index = actions.indexOf(this);
                    if (id != null) {
                        this.id = null;
                        root_1.root.clearInterval(id);
                    }
                    if (index !== -1) {
                        actions.splice(index, 1);
                    }
                    this.work = null;
                    this.state = null;
                    this.scheduler = null;
                }
            }
            exports_1("FutureAction", FutureAction);
        }
    }
});
