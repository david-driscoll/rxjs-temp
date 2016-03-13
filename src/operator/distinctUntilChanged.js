System.register(['../Subscriber', '../util/tryCatch', '../util/errorObject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, tryCatch_1, errorObject_1;
    var DistinctUntilChangedOperator, DistinctUntilChangedSubscriber;
    function distinctUntilChanged(compare, keySelector) {
        return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
    }
    exports_1("distinctUntilChanged", distinctUntilChanged);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            }],
        execute: function() {
            class DistinctUntilChangedOperator {
                constructor(compare, keySelector) {
                    this.compare = compare;
                    this.keySelector = keySelector;
                }
                call(subscriber) {
                    return new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector);
                }
            }
            class DistinctUntilChangedSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, compare, keySelector) {
                    super(destination);
                    this.keySelector = keySelector;
                    this.hasKey = false;
                    if (typeof compare === 'function') {
                        this.compare = compare;
                    }
                }
                compare(x, y) {
                    return x === y;
                }
                _next(value) {
                    const keySelector = this.keySelector;
                    let key = value;
                    if (keySelector) {
                        key = tryCatch_1.tryCatch(this.keySelector)(value);
                        if (key === errorObject_1.errorObject) {
                            return this.destination.error(errorObject_1.errorObject.e);
                        }
                    }
                    let result = false;
                    if (this.hasKey) {
                        result = tryCatch_1.tryCatch(this.compare)(this.key, key);
                        if (result === errorObject_1.errorObject) {
                            return this.destination.error(errorObject_1.errorObject.e);
                        }
                    }
                    else {
                        this.hasKey = true;
                    }
                    if (Boolean(result) === false) {
                        this.key = key;
                        this.destination.next(value);
                    }
                }
            }
        }
    }
});
