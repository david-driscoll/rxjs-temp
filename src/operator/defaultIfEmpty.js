System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var DefaultIfEmptyOperator, DefaultIfEmptySubscriber;
    function defaultIfEmpty(defaultValue = null) {
        return this.lift(new DefaultIfEmptyOperator(defaultValue));
    }
    exports_1("defaultIfEmpty", defaultIfEmpty);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class DefaultIfEmptyOperator {
                constructor(defaultValue) {
                    this.defaultValue = defaultValue;
                }
                call(subscriber) {
                    return new DefaultIfEmptySubscriber(subscriber, this.defaultValue);
                }
            }
            class DefaultIfEmptySubscriber extends Subscriber_1.Subscriber {
                constructor(destination, defaultValue) {
                    super(destination);
                    this.defaultValue = defaultValue;
                    this.isEmpty = true;
                }
                _next(value) {
                    this.isEmpty = false;
                    this.destination.next(value);
                }
                _complete() {
                    if (this.isEmpty) {
                        this.destination.next(this.defaultValue);
                    }
                    this.destination.complete();
                }
            }
        }
    }
});
