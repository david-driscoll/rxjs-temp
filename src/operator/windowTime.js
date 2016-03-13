System.register(['../Subscriber', '../Subject', '../scheduler/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, Subject_1, async_1;
    var WindowTimeOperator, WindowTimeSubscriber;
    function windowTime(windowTimeSpan, windowCreationInterval = null, scheduler = async_1.async) {
        return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
    }
    exports_1("windowTime", windowTime);
    function dispatchWindowTimeSpanOnly(state) {
        const { subscriber, windowTimeSpan, window } = state;
        if (window) {
            window.complete();
        }
        state.window = subscriber.openWindow();
        this.schedule(state, windowTimeSpan);
    }
    function dispatchWindowCreation(state) {
        let { windowTimeSpan, subscriber, scheduler, windowCreationInterval } = state;
        let window = subscriber.openWindow();
        let action = this;
        let context = { action: action, subscription: null };
        const timeSpanState = { subscriber: subscriber, window: window, context: context };
        context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
        action.add(context.subscription);
        action.schedule(state, windowCreationInterval);
    }
    function dispatchWindowClose({ subscriber, window, context }) {
        if (context && context.action && context.subscription) {
            context.action.remove(context.subscription);
        }
        subscriber.closeWindow(window);
    }
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            class WindowTimeOperator {
                constructor(windowTimeSpan, windowCreationInterval, scheduler) {
                    this.windowTimeSpan = windowTimeSpan;
                    this.windowCreationInterval = windowCreationInterval;
                    this.scheduler = scheduler;
                }
                call(subscriber) {
                    return new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler);
                }
            }
            class WindowTimeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, windowTimeSpan, windowCreationInterval, scheduler) {
                    super(destination);
                    this.destination = destination;
                    this.windowTimeSpan = windowTimeSpan;
                    this.windowCreationInterval = windowCreationInterval;
                    this.scheduler = scheduler;
                    this.windows = [];
                    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
                        let window = this.openWindow();
                        const closeState = { subscriber: this, window: window, context: null };
                        const creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: this, scheduler: scheduler };
                        this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
                        this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
                    }
                    else {
                        let window = this.openWindow();
                        const timeSpanOnlyState = { subscriber: this, window: window, windowTimeSpan: windowTimeSpan };
                        this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
                    }
                }
                _next(value) {
                    const windows = this.windows;
                    const len = windows.length;
                    for (let i = 0; i < len; i++) {
                        const window = windows[i];
                        if (!window.isUnsubscribed) {
                            window.next(value);
                        }
                    }
                }
                _error(err) {
                    const windows = this.windows;
                    while (windows.length > 0) {
                        windows.shift().error(err);
                    }
                    this.destination.error(err);
                }
                _complete() {
                    const windows = this.windows;
                    while (windows.length > 0) {
                        const window = windows.shift();
                        if (!window.isUnsubscribed) {
                            window.complete();
                        }
                    }
                    this.destination.complete();
                }
                openWindow() {
                    const window = new Subject_1.Subject();
                    this.windows.push(window);
                    const destination = this.destination;
                    destination.add(window);
                    destination.next(window);
                    return window;
                }
                closeWindow(window) {
                    window.complete();
                    const windows = this.windows;
                    windows.splice(windows.indexOf(window), 1);
                }
            }
        }
    }
});
