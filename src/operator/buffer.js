System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OuterSubscriber_1, subscribeToResult_1;
    var BufferOperator, BufferSubscriber;
    function buffer(closingNotifier) {
        return this.lift(new BufferOperator(closingNotifier));
    }
    exports_1("buffer", buffer);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            class BufferOperator {
                constructor(closingNotifier) {
                    this.closingNotifier = closingNotifier;
                }
                call(subscriber) {
                    return new BufferSubscriber(subscriber, this.closingNotifier);
                }
            }
            class BufferSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, closingNotifier) {
                    super(destination);
                    this.buffer = [];
                    this.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
                }
                _next(value) {
                    this.buffer.push(value);
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    const buffer = this.buffer;
                    this.buffer = [];
                    this.destination.next(buffer);
                }
            }
        }
    }
});
