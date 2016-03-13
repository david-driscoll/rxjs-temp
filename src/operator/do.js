System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var DoOperator, DoSubscriber;
    function _do(nextOrObserver, error, complete) {
        return this.lift(new DoOperator(nextOrObserver, error, complete));
    }
    exports_1("_do", _do);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class DoOperator {
                constructor(nextOrObserver, error, complete) {
                    this.nextOrObserver = nextOrObserver;
                    this.error = error;
                    this.complete = complete;
                }
                call(subscriber) {
                    return new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete);
                }
            }
            class DoSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, nextOrObserver, error, complete) {
                    super(destination);
                    const safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
                    safeSubscriber.syncErrorThrowable = true;
                    this.add(safeSubscriber);
                    this.safeSubscriber = safeSubscriber;
                }
                _next(value) {
                    const { safeSubscriber } = this;
                    safeSubscriber.next(value);
                    if (safeSubscriber.syncErrorThrown) {
                        this.destination.error(safeSubscriber.syncErrorValue);
                    }
                    else {
                        this.destination.next(value);
                    }
                }
                _error(err) {
                    const { safeSubscriber } = this;
                    safeSubscriber.error(err);
                    if (safeSubscriber.syncErrorThrown) {
                        this.destination.error(safeSubscriber.syncErrorValue);
                    }
                    else {
                        this.destination.error(err);
                    }
                }
                _complete() {
                    const { safeSubscriber } = this;
                    safeSubscriber.complete();
                    if (safeSubscriber.syncErrorThrown) {
                        this.destination.error(safeSubscriber.syncErrorValue);
                    }
                    else {
                        this.destination.complete();
                    }
                }
            }
        }
    }
});
