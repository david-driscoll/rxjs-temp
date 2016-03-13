System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var SampleOperator, SampleSubscriber;
    function sample(notifier) {
        return this.lift(new SampleOperator(notifier));
    }
    exports_1("sample", sample);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class SampleOperator {
                constructor(notifier) {
                    this.notifier = notifier;
                }
                call(subscriber) {
                    return new SampleSubscriber(subscriber, this.notifier);
                }
            }
            class SampleSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, notifier) {
                    super(destination);
                    this.hasValue = false;
                    this.add(subscribeToResult_1.subscribeToResult(this, notifier));
                }
                _next(value) {
                    this.value = value;
                    this.hasValue = true;
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.emitValue();
                }
                notifyComplete() {
                    this.emitValue();
                }
                emitValue() {
                    if (this.hasValue) {
                        this.hasValue = false;
                        this.destination.next(this.value);
                    }
                }
            }
        }
    }
});
