System.register(['../Subject', '../scheduler/queue', '../operator/observeOn'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, queue_1, observeOn_1;
    var ReplaySubject, ReplayEvent;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (queue_1_1) {
                queue_1 = queue_1_1;
            },
            function (observeOn_1_1) {
                observeOn_1 = observeOn_1_1;
            }],
        execute: function() {
            class ReplaySubject extends Subject_1.Subject {
                constructor(bufferSize = Number.POSITIVE_INFINITY, windowTime = Number.POSITIVE_INFINITY, scheduler) {
                    super();
                    this.events = [];
                    this.scheduler = scheduler;
                    this.bufferSize = bufferSize < 1 ? 1 : bufferSize;
                    this._windowTime = windowTime < 1 ? 1 : windowTime;
                }
                _next(value) {
                    const now = this._getNow();
                    this.events.push(new ReplayEvent(now, value));
                    this._trimBufferThenGetEvents(now);
                    super._next(value);
                }
                _subscribe(subscriber) {
                    const events = this._trimBufferThenGetEvents(this._getNow());
                    const scheduler = this.scheduler;
                    if (scheduler) {
                        subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
                    }
                    let index = -1;
                    const len = events.length;
                    while (++index < len && !subscriber.isUnsubscribed) {
                        subscriber.next(events[index].value);
                    }
                    return super._subscribe(subscriber);
                }
                _getNow() {
                    return (this.scheduler || queue_1.queue).now();
                }
                _trimBufferThenGetEvents(now) {
                    const bufferSize = this.bufferSize;
                    const _windowTime = this._windowTime;
                    const events = this.events;
                    let eventsCount = events.length;
                    let spliceCount = 0;
                    while (spliceCount < eventsCount) {
                        if ((now - events[spliceCount].time) < _windowTime) {
                            break;
                        }
                        spliceCount += 1;
                    }
                    if (eventsCount > bufferSize) {
                        spliceCount = Math.max(spliceCount, eventsCount - bufferSize);
                    }
                    if (spliceCount > 0) {
                        events.splice(0, spliceCount);
                    }
                    return events;
                }
            }
            exports_1("ReplaySubject", ReplaySubject);
            class ReplayEvent {
                constructor(time, value) {
                    this.time = time;
                    this.value = value;
                }
            }
        }
    }
});
