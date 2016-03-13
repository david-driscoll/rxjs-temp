System.register(['../Subscriber', '../Subject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, Subject_1;
    var WindowCountOperator, WindowCountSubscriber;
    function windowCount(windowSize, startWindowEvery = 0) {
        return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
    }
    exports_1("windowCount", windowCount);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            class WindowCountOperator {
                constructor(windowSize, startWindowEvery) {
                    this.windowSize = windowSize;
                    this.startWindowEvery = startWindowEvery;
                }
                call(subscriber) {
                    return new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery);
                }
            }
            class WindowCountSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, windowSize, startWindowEvery) {
                    super(destination);
                    this.destination = destination;
                    this.windowSize = windowSize;
                    this.startWindowEvery = startWindowEvery;
                    this.windows = [new Subject_1.Subject()];
                    this.count = 0;
                    const firstWindow = this.windows[0];
                    destination.add(firstWindow);
                    destination.next(firstWindow);
                }
                _next(value) {
                    const startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
                    const destination = this.destination;
                    const windowSize = this.windowSize;
                    const windows = this.windows;
                    const len = windows.length;
                    for (let i = 0; i < len; i++) {
                        windows[i].next(value);
                    }
                    const c = this.count - windowSize + 1;
                    if (c >= 0 && c % startWindowEvery === 0) {
                        windows.shift().complete();
                    }
                    if (++this.count % startWindowEvery === 0) {
                        const window = new Subject_1.Subject();
                        windows.push(window);
                        destination.add(window);
                        destination.next(window);
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
                        windows.shift().complete();
                    }
                    this.destination.complete();
                }
            }
        }
    }
});
