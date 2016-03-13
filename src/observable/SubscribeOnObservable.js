System.register(['../Observable', '../scheduler/asap', '../util/isNumeric'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, asap_1, isNumeric_1;
    var SubscribeOnObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (asap_1_1) {
                asap_1 = asap_1_1;
            },
            function (isNumeric_1_1) {
                isNumeric_1 = isNumeric_1_1;
            }],
        execute: function() {
            class SubscribeOnObservable extends Observable_1.Observable {
                constructor(source, delayTime = 0, scheduler = asap_1.asap) {
                    super();
                    this.source = source;
                    this.delayTime = delayTime;
                    this.scheduler = scheduler;
                    if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
                        this.delayTime = 0;
                    }
                    if (!scheduler || typeof scheduler.schedule !== 'function') {
                        this.scheduler = asap_1.asap;
                    }
                }
                static create(source, delay = 0, scheduler = asap_1.asap) {
                    return new SubscribeOnObservable(source, delay, scheduler);
                }
                static dispatch({ source, subscriber }) {
                    return source.subscribe(subscriber);
                }
                _subscribe(subscriber) {
                    const delay = this.delayTime;
                    const source = this.source;
                    const scheduler = this.scheduler;
                    return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
                        source: source, subscriber: subscriber
                    });
                }
            }
            exports_1("SubscribeOnObservable", SubscribeOnObservable);
        }
    }
});
