System.register(['../Subscriber', '../util/EmptyError'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, EmptyError_1;
    var LastOperator, LastSubscriber;
    function last(predicate, resultSelector, defaultValue) {
        return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
    }
    exports_1("last", last);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (EmptyError_1_1) {
                EmptyError_1 = EmptyError_1_1;
            }],
        execute: function() {
            class LastOperator {
                constructor(predicate, resultSelector, defaultValue, source) {
                    this.predicate = predicate;
                    this.resultSelector = resultSelector;
                    this.defaultValue = defaultValue;
                    this.source = source;
                }
                call(observer) {
                    return new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
                }
            }
            class LastSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate, resultSelector, defaultValue, source) {
                    super(destination);
                    this.predicate = predicate;
                    this.resultSelector = resultSelector;
                    this.defaultValue = defaultValue;
                    this.source = source;
                    this.hasValue = false;
                    this.index = 0;
                    if (typeof defaultValue !== 'undefined') {
                        this.lastValue = defaultValue;
                        this.hasValue = true;
                    }
                }
                _next(value) {
                    const index = this.index++;
                    if (this.predicate) {
                        this._tryPredicate(value, index);
                    }
                    else {
                        if (this.resultSelector) {
                            this._tryResultSelector(value, index);
                            return;
                        }
                        this.lastValue = value;
                        this.hasValue = true;
                    }
                }
                _tryPredicate(value, index) {
                    let result;
                    try {
                        result = this.predicate(value, index, this.source);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    if (result) {
                        if (this.resultSelector) {
                            this._tryResultSelector(value, index);
                            return;
                        }
                        this.lastValue = value;
                        this.hasValue = true;
                    }
                }
                _tryResultSelector(value, index) {
                    let result;
                    try {
                        result = this.resultSelector(value, index);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.lastValue = result;
                    this.hasValue = true;
                }
                _complete() {
                    const destination = this.destination;
                    if (this.hasValue) {
                        destination.next(this.lastValue);
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
