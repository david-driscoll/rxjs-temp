System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var ReduceOperator, ReduceSubscriber;
    function reduce(project, seed) {
        return this.lift(new ReduceOperator(project, seed));
    }
    exports_1("reduce", reduce);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class ReduceOperator {
                constructor(project, seed) {
                    this.project = project;
                    this.seed = seed;
                }
                call(subscriber) {
                    return new ReduceSubscriber(subscriber, this.project, this.seed);
                }
            }
            exports_1("ReduceOperator", ReduceOperator);
            class ReduceSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, project, seed) {
                    super(destination);
                    this.hasValue = false;
                    this.acc = seed;
                    this.project = project;
                    this.hasSeed = typeof seed !== 'undefined';
                }
                _next(value) {
                    if (this.hasValue || (this.hasValue = this.hasSeed)) {
                        this._tryReduce(value);
                    }
                    else {
                        this.acc = value;
                        this.hasValue = true;
                    }
                }
                _tryReduce(value) {
                    let result;
                    try {
                        result = this.project(this.acc, value);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.acc = result;
                }
                _complete() {
                    if (this.hasValue || this.hasSeed) {
                        this.destination.next(this.acc);
                    }
                    this.destination.complete();
                }
            }
            exports_1("ReduceSubscriber", ReduceSubscriber);
        }
    }
});
