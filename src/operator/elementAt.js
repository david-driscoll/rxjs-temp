System.register(['../Subscriber', '../util/ArgumentOutOfRangeError'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, ArgumentOutOfRangeError_1;
    var ElementAtOperator, ElementAtSubscriber;
    function elementAt(index, defaultValue) {
        return this.lift(new ElementAtOperator(index, defaultValue));
    }
    exports_1("elementAt", elementAt);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (ArgumentOutOfRangeError_1_1) {
                ArgumentOutOfRangeError_1 = ArgumentOutOfRangeError_1_1;
            }],
        execute: function() {
            class ElementAtOperator {
                constructor(index, defaultValue) {
                    this.index = index;
                    this.defaultValue = defaultValue;
                    if (index < 0) {
                        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
                    }
                }
                call(subscriber) {
                    return new ElementAtSubscriber(subscriber, this.index, this.defaultValue);
                }
            }
            class ElementAtSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, index, defaultValue) {
                    super(destination);
                    this.index = index;
                    this.defaultValue = defaultValue;
                }
                _next(x) {
                    if (this.index-- === 0) {
                        this.destination.next(x);
                        this.destination.complete();
                    }
                }
                _complete() {
                    const destination = this.destination;
                    if (this.index >= 0) {
                        if (typeof this.defaultValue !== 'undefined') {
                            destination.next(this.defaultValue);
                        }
                        else {
                            destination.error(new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError);
                        }
                    }
                    destination.complete();
                }
            }
        }
    }
});
