System.register(['../Subscriber', '../scheduler/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, async_1;
    var BufferTimeOperator, BufferTimeSubscriber;
    function bufferTime(bufferTimeSpan, bufferCreationInterval = null, scheduler = async_1.async) {
        return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler));
    }
    exports_1("bufferTime", bufferTime);
    function dispatchBufferTimeSpanOnly(state) {
        const subscriber = state.subscriber;
        const prevBuffer = state.buffer;
        if (prevBuffer) {
            subscriber.closeBuffer(prevBuffer);
        }
        state.buffer = subscriber.openBuffer();
        if (!subscriber.isUnsubscribed) {
            this.schedule(state, state.bufferTimeSpan);
        }
    }
    function dispatchBufferCreation(state) {
        const { bufferCreationInterval, bufferTimeSpan, subscriber, scheduler } = state;
        const buffer = subscriber.openBuffer();
        const action = this;
        if (!subscriber.isUnsubscribed) {
            action.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, buffer: buffer }));
            action.schedule(state, bufferCreationInterval);
        }
    }
    function dispatchBufferClose({ subscriber, buffer }) {
        subscriber.closeBuffer(buffer);
    }
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            class BufferTimeOperator {
                constructor(bufferTimeSpan, bufferCreationInterval, scheduler) {
                    this.bufferTimeSpan = bufferTimeSpan;
                    this.bufferCreationInterval = bufferCreationInterval;
                    this.scheduler = scheduler;
                }
                call(subscriber) {
                    return new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.scheduler);
                }
            }
            class BufferTimeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, bufferTimeSpan, bufferCreationInterval, scheduler) {
                    super(destination);
                    this.bufferTimeSpan = bufferTimeSpan;
                    this.bufferCreationInterval = bufferCreationInterval;
                    this.scheduler = scheduler;
                    this.buffers = [];
                    const buffer = this.openBuffer();
                    if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
                        const closeState = { subscriber: this, buffer: buffer };
                        const creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: this, scheduler: scheduler };
                        this.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
                        this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
                    }
                    else {
                        const timeSpanOnlyState = { subscriber: this, buffer: buffer, bufferTimeSpan: bufferTimeSpan };
                        this.add(scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
                    }
                }
                _next(value) {
                    const buffers = this.buffers;
                    const len = buffers.length;
                    for (let i = 0; i < len; i++) {
                        buffers[i].push(value);
                    }
                }
                _error(err) {
                    this.buffers.length = 0;
                    super._error(err);
                }
                _complete() {
                    const { buffers, destination } = this;
                    while (buffers.length > 0) {
                        destination.next(buffers.shift());
                    }
                    super._complete();
                }
                _unsubscribe() {
                    this.buffers = null;
                }
                openBuffer() {
                    let buffer = [];
                    this.buffers.push(buffer);
                    return buffer;
                }
                closeBuffer(buffer) {
                    this.destination.next(buffer);
                    const buffers = this.buffers;
                    buffers.splice(buffers.indexOf(buffer), 1);
                }
            }
        }
    }
});
