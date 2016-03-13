System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1;
    var BufferCountOperator, BufferCountSubscriber;
    function bufferCount(bufferSize, startBufferEvery = null) {
        return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
    }
    exports_1("bufferCount", bufferCount);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            class BufferCountOperator {
                constructor(bufferSize, startBufferEvery) {
                    this.bufferSize = bufferSize;
                    this.startBufferEvery = startBufferEvery;
                }
                call(subscriber) {
                    return new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery);
                }
            }
            class BufferCountSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, bufferSize, startBufferEvery) {
                    super(destination);
                    this.bufferSize = bufferSize;
                    this.startBufferEvery = startBufferEvery;
                    this.buffers = [[]];
                    this.count = 0;
                }
                _next(value) {
                    const count = (this.count += 1);
                    const destination = this.destination;
                    const bufferSize = this.bufferSize;
                    const startBufferEvery = (this.startBufferEvery == null) ? bufferSize : this.startBufferEvery;
                    const buffers = this.buffers;
                    const len = buffers.length;
                    let remove = -1;
                    if (count % startBufferEvery === 0) {
                        buffers.push([]);
                    }
                    for (let i = 0; i < len; i++) {
                        const buffer = buffers[i];
                        buffer.push(value);
                        if (buffer.length === bufferSize) {
                            remove = i;
                            destination.next(buffer);
                        }
                    }
                    if (remove !== -1) {
                        buffers.splice(remove, 1);
                    }
                }
                _complete() {
                    const destination = this.destination;
                    const buffers = this.buffers;
                    while (buffers.length > 0) {
                        let buffer = buffers.shift();
                        if (buffer.length > 0) {
                            destination.next(buffer);
                        }
                    }
                    super._complete();
                }
            }
        }
    }
});
