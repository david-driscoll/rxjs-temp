System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var MapOperator, MapSubscriber;
    function map(project, thisArg) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return this.lift(new MapOperator(project, thisArg));
    }
    exports_1("map", map);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class MapOperator {
                constructor(project, thisArg) {
                    this.project = project;
                    this.thisArg = thisArg;
                }
                call(subscriber) {
                    return new MapSubscriber(subscriber, this.project, this.thisArg);
                }
            }
            class MapSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, project, thisArg) {
                    super(destination);
                    this.project = project;
                    this.count = 0;
                    this.thisArg = thisArg || this;
                }
                _next(value) {
                    let result;
                    try {
                        result = this.project.call(this.thisArg, value, this.count++);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.destination.next(result);
                }
            }
        }
    }
});
