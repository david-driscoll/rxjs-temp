System.register(['../Subscriber', '../Subscription', '../util/tryCatch', '../util/errorObject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, Subscription_1, tryCatch_1, errorObject_1;
    var BufferToggleOperator, BufferToggleSubscriber, BufferToggleOpeningsSubscriber, BufferToggleClosingsSubscriber;
    function bufferToggle(openings, closingSelector) {
        return this.lift(new BufferToggleOperator(openings, closingSelector));
    }
    exports_1("bufferToggle", bufferToggle);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            }],
        execute: function() {
            class BufferToggleOperator {
                constructor(openings, closingSelector) {
                    this.openings = openings;
                    this.closingSelector = closingSelector;
                }
                call(subscriber) {
                    return new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector);
                }
            }
            class BufferToggleSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, openings, closingSelector) {
                    super(destination);
                    this.openings = openings;
                    this.closingSelector = closingSelector;
                    this.contexts = [];
                    this.add(this.openings.subscribe(new BufferToggleOpeningsSubscriber(this)));
                }
                _next(value) {
                    const contexts = this.contexts;
                    const len = contexts.length;
                    for (let i = 0; i < len; i++) {
                        contexts[i].buffer.push(value);
                    }
                }
                _error(err) {
                    const contexts = this.contexts;
                    while (contexts.length > 0) {
                        const context = contexts.shift();
                        context.subscription.unsubscribe();
                        context.buffer = null;
                        context.subscription = null;
                    }
                    this.contexts = null;
                    super._error(err);
                }
                _complete() {
                    const contexts = this.contexts;
                    while (contexts.length > 0) {
                        const context = contexts.shift();
                        this.destination.next(context.buffer);
                        context.subscription.unsubscribe();
                        context.buffer = null;
                        context.subscription = null;
                    }
                    this.contexts = null;
                    super._complete();
                }
                openBuffer(value) {
                    const closingSelector = this.closingSelector;
                    const contexts = this.contexts;
                    let closingNotifier = tryCatch_1.tryCatch(closingSelector)(value);
                    if (closingNotifier === errorObject_1.errorObject) {
                        this._error(errorObject_1.errorObject.e);
                    }
                    else {
                        let context = {
                            buffer: [],
                            subscription: new Subscription_1.Subscription()
                        };
                        contexts.push(context);
                        const subscriber = new BufferToggleClosingsSubscriber(this, context);
                        const subscription = closingNotifier.subscribe(subscriber);
                        context.subscription.add(subscription);
                        this.add(subscription);
                    }
                }
                closeBuffer(context) {
                    const contexts = this.contexts;
                    if (contexts === null) {
                        return;
                    }
                    const { buffer, subscription } = context;
                    this.destination.next(buffer);
                    contexts.splice(contexts.indexOf(context), 1);
                    this.remove(subscription);
                    subscription.unsubscribe();
                }
            }
            class BufferToggleOpeningsSubscriber extends Subscriber_1.Subscriber {
                constructor(parent) {
                    super(null);
                    this.parent = parent;
                }
                _next(value) {
                    this.parent.openBuffer(value);
                }
                _error(err) {
                    this.parent.error(err);
                }
                _complete() {
                }
            }
            class BufferToggleClosingsSubscriber extends Subscriber_1.Subscriber {
                constructor(parent, context) {
                    super(null);
                    this.parent = parent;
                    this.context = context;
                }
                _next() {
                    this.parent.closeBuffer(this.context);
                }
                _error(err) {
                    this.parent.error(err);
                }
                _complete() {
                    this.parent.closeBuffer(this.context);
                }
            }
        }
    }
});
