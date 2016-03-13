System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var CountOperator, CountSubscriber;
    function count(predicate) {
        return this.lift(new CountOperator(predicate, this));
    }
    exports_1("count", count);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class CountOperator {
                constructor(predicate, source) {
                    this.predicate = predicate;
                    this.source = source;
                }
                call(subscriber) {
                    return new CountSubscriber(subscriber, this.predicate, this.source);
                }
            }
            class CountSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate, source) {
                    super(destination);
                    this.predicate = predicate;
                    this.source = source;
                    this.count = 0;
                    this.index = 0;
                }
                _next(value) {
                    if (this.predicate) {
                        this._tryPredicate(value);
                    }
                    else {
                        this.count++;
                    }
                }
                _tryPredicate(value) {
                    let result;
                    try {
                        result = this.predicate(value, this.index++, this.source);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    if (result) {
                        this.count++;
                    }
                }
                _complete() {
                    this.destination.next(this.count);
                    this.destination.complete();
                }
            }
        }
    }
});
