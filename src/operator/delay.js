System.register(['../scheduler/async', '../util/isDate', '../Subscriber', '../Notification'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_1, isDate_1, Subscriber_1, Notification_1;
    var DelayOperator, DelaySubscriber, DelayMessage;
    function delay(delay, scheduler = async_1.async) {
        const absoluteDelay = isDate_1.isDate(delay);
        const delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
        return this.lift(new DelayOperator(delayFor, scheduler));
    }
    exports_1("delay", delay);
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (isDate_1_1) {
                isDate_1 = isDate_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Notification_1_1) {
                Notification_1 = Notification_1_1;
            }],
        execute: function() {
            class DelayOperator {
                constructor(delay, scheduler) {
                    this.delay = delay;
                    this.scheduler = scheduler;
                }
                call(subscriber) {
                    return new DelaySubscriber(subscriber, this.delay, this.scheduler);
                }
            }
            class DelaySubscriber extends Subscriber_1.Subscriber {
                constructor(destination, delay, scheduler) {
                    super(destination);
                    this.delay = delay;
                    this.scheduler = scheduler;
                    this.queue = [];
                    this.active = false;
                    this.errored = false;
                }
                static dispatch(state) {
                    const source = state.source;
                    const queue = source.queue;
                    const scheduler = state.scheduler;
                    const destination = state.destination;
                    while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
                        queue.shift().notification.observe(destination);
                    }
                    if (queue.length > 0) {
                        const delay = Math.max(0, queue[0].time - scheduler.now());
                        this.schedule(state, delay);
                    }
                    else {
                        source.active = false;
                    }
                }
                _schedule(scheduler) {
                    this.active = true;
                    this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
                        source: this, destination: this.destination, scheduler: scheduler
                    }));
                }
                scheduleNotification(notification) {
                    if (this.errored === true) {
                        return;
                    }
                    const scheduler = this.scheduler;
                    const message = new DelayMessage(scheduler.now() + this.delay, notification);
                    this.queue.push(message);
                    if (this.active === false) {
                        this._schedule(scheduler);
                    }
                }
                _next(value) {
                    this.scheduleNotification(Notification_1.Notification.createNext(value));
                }
                _error(err) {
                    this.errored = true;
                    this.queue = [];
                    this.destination.error(err);
                }
                _complete() {
                    this.scheduleNotification(Notification_1.Notification.createComplete());
                }
            }
            class DelayMessage {
                constructor(time, notification) {
                    this.time = time;
                    this.notification = notification;
                }
            }
        }
    }
});
