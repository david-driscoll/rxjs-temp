System.register(['./Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var InnerSubscriber;
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class InnerSubscriber extends Subscriber_1.Subscriber {
                constructor(parent, outerValue, outerIndex) {
                    super();
                    this.parent = parent;
                    this.outerValue = outerValue;
                    this.outerIndex = outerIndex;
                    this.index = 0;
                }
                _next(value) {
                    this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
                }
                _error(error) {
                    this.parent.notifyError(error, this);
                    this.unsubscribe();
                }
                _complete() {
                    this.parent.notifyComplete(this);
                    this.unsubscribe();
                }
            }
            exports_1("InnerSubscriber", InnerSubscriber);
        }
    }
});
