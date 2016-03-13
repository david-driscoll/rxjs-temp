System.register(['../Subscriber', '../util/EmptyError'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, EmptyError_1;
    var SingleOperator, SingleSubscriber;
    function single(predicate) {
        return this.lift(new SingleOperator(predicate, this));
    }
    exports_1("single", single);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (EmptyError_1_1) {
                EmptyError_1 = EmptyError_1_1;
            }],
        execute: function() {
            class SingleOperator {
                constructor(predicate, source) {
                    this.predicate = predicate;
                    this.source = source;
                }
                call(subscriber) {
                    return new SingleSubscriber(subscriber, this.predicate, this.source);
                }
            }
            class SingleSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate, source) {
                    super(destination);
                    this.predicate = predicate;
                    this.source = source;
                    this.seenValue = false;
                    this.index = 0;
                }
                applySingleValue(value) {
                    if (this.seenValue) {
                        this.destination.error('Sequence contains more than one element');
                    }
                    else {
                        this.seenValue = true;
                        this.singleValue = value;
                    }
                }
                _next(value) {
                    const predicate = this.predicate;
                    this.index++;
                    if (predicate) {
                        this.tryNext(value);
                    }
                    else {
                        this.applySingleValue(value);
                    }
                }
                tryNext(value) {
                    try {
                        const result = this.predicate(value, this.index, this.source);
                        if (result) {
                            this.applySingleValue(value);
                        }
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                }
                _complete() {
                    const destination = this.destination;
                    if (this.index > 0) {
                        destination.next(this.seenValue ? this.singleValue : undefined);
                        destination.complete();
                    }
                    else {
                        destination.error(new EmptyError_1.EmptyError);
                    }
                }
            }
        }
    }
});
