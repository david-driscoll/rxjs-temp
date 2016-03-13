System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var FilterOperator, FilterSubscriber;
    function filter(select, thisArg) {
        return this.lift(new FilterOperator(select, thisArg));
    }
    exports_1("filter", filter);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class FilterOperator {
                constructor(select, thisArg) {
                    this.select = select;
                    this.thisArg = thisArg;
                }
                call(subscriber) {
                    return new FilterSubscriber(subscriber, this.select, this.thisArg);
                }
            }
            class FilterSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, select, thisArg) {
                    super(destination);
                    this.select = select;
                    this.thisArg = thisArg;
                    this.count = 0;
                    this.select = select;
                }
                _next(value) {
                    let result;
                    try {
                        result = this.select.call(this.thisArg, value, this.count++);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    if (result) {
                        this.destination.next(value);
                    }
                }
            }
        }
    }
});
