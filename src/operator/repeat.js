System.register(['../Subscriber', '../observable/EmptyObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, EmptyObservable_1;
    var RepeatOperator, RepeatSubscriber;
    function repeat(count = -1) {
        if (count === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else if (count < 0) {
            return this.lift(new RepeatOperator(-1, this));
        }
        else {
            return this.lift(new RepeatOperator(count - 1, this));
        }
    }
    exports_1("repeat", repeat);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            }],
        execute: function() {
            class RepeatOperator {
                constructor(count, source) {
                    this.count = count;
                    this.source = source;
                }
                call(subscriber) {
                    return new RepeatSubscriber(subscriber, this.count, this.source);
                }
            }
            class RepeatSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, count, source) {
                    super(destination);
                    this.count = count;
                    this.source = source;
                }
                complete() {
                    if (!this.isStopped) {
                        const { source, count } = this;
                        if (count === 0) {
                            return super.complete();
                        }
                        else if (count > -1) {
                            this.count = count - 1;
                        }
                        this.unsubscribe();
                        this.isStopped = false;
                        this.isUnsubscribed = false;
                        source.subscribe(this);
                    }
                }
            }
        }
    }
});
