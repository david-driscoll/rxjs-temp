System.register(['../Subscriber', '../Notification'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, Notification_1;
    var MaterializeOperator, MaterializeSubscriber;
    function materialize() {
        return this.lift(new MaterializeOperator());
    }
    exports_1("materialize", materialize);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Notification_1_1) {
                Notification_1 = Notification_1_1;
            }],
        execute: function() {
            class MaterializeOperator {
                call(subscriber) {
                    return new MaterializeSubscriber(subscriber);
                }
            }
            class MaterializeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination) {
                    super(destination);
                }
                _next(value) {
                    this.destination.next(Notification_1.Notification.createNext(value));
                }
                _error(err) {
                    const destination = this.destination;
                    destination.next(Notification_1.Notification.createError(err));
                    destination.complete();
                }
                _complete() {
                    const destination = this.destination;
                    destination.next(Notification_1.Notification.createComplete());
                    destination.complete();
                }
            }
        }
    }
});
