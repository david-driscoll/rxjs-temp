System.register(['../Subject', '../util/tryCatch', '../util/errorObject', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1;
    var WindowOperator, WindowSubscriber;
    function windowWhen(closingSelector) {
        return this.lift(new WindowOperator(closingSelector));
    }
    exports_1("windowWhen", windowWhen);
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class WindowOperator {
                constructor(closingSelector) {
                    this.closingSelector = closingSelector;
                }
                call(subscriber) {
                    return new WindowSubscriber(subscriber, this.closingSelector);
                }
            }
            class WindowSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, closingSelector) {
                    super(destination);
                    this.destination = destination;
                    this.closingSelector = closingSelector;
                    this.openWindow();
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.openWindow(innerSub);
                }
                notifyError(error, innerSub) {
                    this._error(error);
                }
                notifyComplete(innerSub) {
                    this.openWindow(innerSub);
                }
                _next(value) {
                    this.window.next(value);
                }
                _error(err) {
                    this.window.error(err);
                    this.destination.error(err);
                    this.unsubscribeClosingNotification();
                }
                _complete() {
                    this.window.complete();
                    this.destination.complete();
                    this.unsubscribeClosingNotification();
                }
                unsubscribeClosingNotification() {
                    if (this.closingNotification) {
                        this.closingNotification.unsubscribe();
                    }
                }
                openWindow(innerSub = null) {
                    if (innerSub) {
                        this.remove(innerSub);
                        innerSub.unsubscribe();
                    }
                    const prevWindow = this.window;
                    if (prevWindow) {
                        prevWindow.complete();
                    }
                    const window = this.window = new Subject_1.Subject();
                    this.destination.next(window);
                    const closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
                    if (closingNotifier === errorObject_1.errorObject) {
                        const err = errorObject_1.errorObject.e;
                        this.destination.error(err);
                        this.window.error(err);
                    }
                    else {
                        this.add(this.closingNotification = subscribeToResult_1.subscribeToResult(this, closingNotifier));
                        this.add(window);
                    }
                }
            }
        }
    }
});
