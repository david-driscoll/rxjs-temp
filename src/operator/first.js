System.register(['../Subscriber', '../util/EmptyError'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, EmptyError_1;
    var FirstOperator, FirstSubscriber;
    function first(predicate, resultSelector, defaultValue) {
        return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
    }
    exports_1("first", first);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (EmptyError_1_1) {
                EmptyError_1 = EmptyError_1_1;
            }],
        execute: function() {
            class FirstOperator {
                constructor(predicate, resultSelector, defaultValue, source) {
                    this.predicate = predicate;
                    this.resultSelector = resultSelector;
                    this.defaultValue = defaultValue;
                    this.source = source;
                }
                call(observer) {
                    return new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
                }
            }
            class FirstSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate, resultSelector, defaultValue, source) {
                    super(destination);
                    this.predicate = predicate;
                    this.resultSelector = resultSelector;
                    this.defaultValue = defaultValue;
                    this.source = source;
                    this.index = 0;
                    this.hasCompleted = false;
                }
                _next(value) {
                    const index = this.index++;
                    if (this.predicate) {
                        this._tryPredicate(value, index);
                    }
                    else {
                        this._emit(value, index);
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
                        this._emit(value, index);
                    }
                }
                _emit(value, index) {
                    if (this.resultSelector) {
                        this._tryResultSelector(value, index);
                        return;
                    }
                    this._emitFinal(value);
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
                    this._emitFinal(result);
                }
                _emitFinal(value) {
                    const destination = this.destination;
                    destination.next(value);
                    destination.complete();
                    this.hasCompleted = true;
                }
                _complete() {
                    const destination = this.destination;
                    if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
                        destination.next(this.defaultValue);
                        destination.complete();
                    }
                    else if (!this.hasCompleted) {
                        destination.error(new EmptyError_1.EmptyError);
                    }
                }
            }
        }
    }
});
