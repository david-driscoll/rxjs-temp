System.register(['../Subject', '../Subscription', '../util/tryCatch', '../util/errorObject', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, Subscription_1, tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1;
    var WindowToggleOperator, WindowToggleSubscriber;
    function windowToggle(openings, closingSelector) {
        return this.lift(new WindowToggleOperator(openings, closingSelector));
    }
    exports_1("windowToggle", windowToggle);
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
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
            class WindowToggleOperator {
                constructor(openings, closingSelector) {
                    this.openings = openings;
                    this.closingSelector = closingSelector;
                }
                call(subscriber) {
                    return new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector);
                }
            }
            class WindowToggleSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, openings, closingSelector) {
                    super(destination);
                    this.openings = openings;
                    this.closingSelector = closingSelector;
                    this.contexts = [];
                    this.add(this.openSubscription = subscribeToResult_1.subscribeToResult(this, openings, openings));
                }
                _next(value) {
                    const { contexts } = this;
                    if (contexts) {
                        const len = contexts.length;
                        for (let i = 0; i < len; i++) {
                            contexts[i].window.next(value);
                        }
                    }
                }
                _error(err) {
                    const { contexts } = this;
                    this.contexts = null;
                    if (contexts) {
                        const len = contexts.length;
                        let index = -1;
                        while (++index < len) {
                            const context = contexts[index];
                            context.window.error(err);
                            context.subscription.unsubscribe();
                        }
                    }
                    super._error(err);
                }
                _complete() {
                    const { contexts } = this;
                    this.contexts = null;
                    if (contexts) {
                        const len = contexts.length;
                        let index = -1;
                        while (++index < len) {
                            const context = contexts[index];
                            context.window.complete();
                            context.subscription.unsubscribe();
                        }
                    }
                    super._complete();
                }
                _unsubscribe() {
                    const { contexts } = this;
                    this.contexts = null;
                    if (contexts) {
                        const len = contexts.length;
                        let index = -1;
                        while (++index < len) {
                            const context = contexts[index];
                            context.window.unsubscribe();
                            context.subscription.unsubscribe();
                        }
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    if (outerValue === this.openings) {
                        const { closingSelector } = this;
                        const closingNotifier = tryCatch_1.tryCatch(closingSelector)(innerValue);
                        if (closingNotifier === errorObject_1.errorObject) {
                            return this.error(errorObject_1.errorObject.e);
                        }
                        else {
                            const window = new Subject_1.Subject();
                            const subscription = new Subscription_1.Subscription();
                            const context = { window: window, subscription: subscription };
                            this.contexts.push(context);
                            const innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
                            innerSubscription.context = context;
                            subscription.add(innerSubscription);
                            this.destination.next(window);
                        }
                    }
                    else {
                        this.closeWindow(this.contexts.indexOf(outerValue));
                    }
                }
                notifyError(err) {
                    this.error(err);
                }
                notifyComplete(inner) {
                    if (inner !== this.openSubscription) {
                        this.closeWindow(this.contexts.indexOf(inner.context));
                    }
                }
                closeWindow(index) {
                    const { contexts } = this;
                    const context = contexts[index];
                    const { window, subscription } = context;
                    contexts.splice(index, 1);
                    window.complete();
                    subscription.unsubscribe();
                }
            }
        }
    }
});
