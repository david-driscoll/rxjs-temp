System.register(['../Subject', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, OuterSubscriber_1, subscribeToResult_1;
    var WindowOperator, WindowSubscriber;
    function window(closingNotifier) {
        return this.lift(new WindowOperator(closingNotifier));
    }
    exports_1("window", window);
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class WindowOperator {
                constructor(closingNotifier) {
                    this.closingNotifier = closingNotifier;
                }
                call(subscriber) {
                    return new WindowSubscriber(subscriber, this.closingNotifier);
                }
            }
            class WindowSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, closingNotifier) {
                    super(destination);
                    this.destination = destination;
                    this.closingNotifier = closingNotifier;
                    this.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
                    this.openWindow();
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.openWindow();
                }
                notifyError(error, innerSub) {
                    this._error(error);
                }
                notifyComplete(innerSub) {
                    this._complete();
                }
                _next(value) {
                    this.window.next(value);
                }
                _error(err) {
                    this.window.error(err);
                    this.destination.error(err);
                }
                _complete() {
                    this.window.complete();
                    this.destination.complete();
                }
                openWindow() {
                    const prevWindow = this.window;
                    if (prevWindow) {
                        prevWindow.complete();
                    }
                    const destination = this.destination;
                    const newWindow = this.window = new Subject_1.Subject();
                    destination.add(newWindow);
                    destination.next(newWindow);
                }
            }
        }
    }
});
