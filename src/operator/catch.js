System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var CatchOperator, CatchSubscriber;
    function _catch(selector) {
        const operator = new CatchOperator(selector);
        const caught = this.lift(operator);
        return (operator.caught = caught);
    }
    exports_1("_catch", _catch);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class CatchOperator {
                constructor(selector) {
                    this.selector = selector;
                }
                call(subscriber) {
                    return new CatchSubscriber(subscriber, this.selector, this.caught);
                }
            }
            class CatchSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, selector, caught) {
                    super(destination);
                    this.selector = selector;
                    this.caught = caught;
                }
                error(err) {
                    if (!this.isStopped) {
                        let result;
                        try {
                            result = this.selector(err, this.caught);
                        }
                        catch (err) {
                            this.destination.error(err);
                            return;
                        }
                        this._innerSub(result);
                    }
                }
                _innerSub(result) {
                    this.unsubscribe();
                    this.destination.remove(this);
                    result.subscribe(this.destination);
                }
            }
        }
    }
});
