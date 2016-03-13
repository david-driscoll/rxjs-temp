System.register(['../Subject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1;
    var AsyncSubject;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            class AsyncSubject extends Subject_1.Subject {
                constructor(...args) {
                    super(...args);
                    this.value = null;
                    this.hasNext = false;
                }
                _subscribe(subscriber) {
                    if (this.hasCompleted && this.hasNext) {
                        subscriber.next(this.value);
                    }
                    return super._subscribe(subscriber);
                }
                _next(value) {
                    this.value = value;
                    this.hasNext = true;
                }
                _complete() {
                    let index = -1;
                    const observers = this.observers;
                    const len = observers.length;
                    this.isUnsubscribed = true;
                    if (this.hasNext) {
                        while (++index < len) {
                            let o = observers[index];
                            o.next(this.value);
                            o.complete();
                        }
                    }
                    else {
                        while (++index < len) {
                            observers[index].complete();
                        }
                    }
                    this.isUnsubscribed = false;
                    this.unsubscribe();
                }
            }
            exports_1("AsyncSubject", AsyncSubject);
        }
    }
});
