System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var RetryOperator, RetrySubscriber;
    function retry(count = -1) {
        return this.lift(new RetryOperator(count, this));
    }
    exports_1("retry", retry);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class RetryOperator {
                constructor(count, source) {
                    this.count = count;
                    this.source = source;
                }
                call(subscriber) {
                    return new RetrySubscriber(subscriber, this.count, this.source);
                }
            }
            class RetrySubscriber extends Subscriber_1.Subscriber {
                constructor(destination, count, source) {
                    super(destination);
                    this.count = count;
                    this.source = source;
                }
                error(err) {
                    if (!this.isStopped) {
                        const { source, count } = this;
                        if (count === 0) {
                            return super.error(err);
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
