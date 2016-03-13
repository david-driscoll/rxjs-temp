System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var MapToOperator, MapToSubscriber;
    function mapTo(value) {
        return this.lift(new MapToOperator(value));
    }
    exports_1("mapTo", mapTo);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class MapToOperator {
                constructor(value) {
                    this.value = value;
                }
                call(subscriber) {
                    return new MapToSubscriber(subscriber, this.value);
                }
            }
            class MapToSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, value) {
                    super(destination);
                    this.value = value;
                }
                _next(x) {
                    this.destination.next(this.value);
                }
            }
        }
    }
});
