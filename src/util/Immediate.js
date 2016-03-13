System.register(['./root'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1;
    var ImmediateDefinition, Immediate;
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            }],
        execute: function() {
            class ImmediateDefinition {
                constructor(root) {
                    this.root = root;
                    if (root.setImmediate && typeof root.setImmediate === 'function') {
                        this.setImmediate = root.setImmediate.bind(root);
                        this.clearImmediate = root.clearImmediate.bind(root);
                    }
                    else {
                        this.nextHandle = 1;
                        this.tasksByHandle = {};
                        this.currentlyRunningATask = false;
                        if (this.canUseProcessNextTick()) {
                            this.setImmediate = this.createProcessNextTickSetImmediate();
                        }
                        else if (this.canUsePostMessage()) {
                            this.setImmediate = this.createPostMessageSetImmediate();
                        }
                        else if (this.canUseMessageChannel()) {
                            this.setImmediate = this.createMessageChannelSetImmediate();
                        }
                        else if (this.canUseReadyStateChange()) {
                            this.setImmediate = this.createReadyStateChangeSetImmediate();
                        }
                        else {
                            this.setImmediate = this.createSetTimeoutSetImmediate();
                        }
                        let ci = function clearImmediate(handle) {
                            delete clearImmediate.instance.tasksByHandle[handle];
                        };
                        ci.instance = this;
                        this.clearImmediate = ci;
                    }
                }
                identify(o) {
                    return this.root.Object.prototype.toString.call(o);
                }
                canUseProcessNextTick() {
                    return this.identify(this.root.process) === '[object process]';
                }
                canUseMessageChannel() {
                    return Boolean(this.root.MessageChannel);
                }
                canUseReadyStateChange() {
                    const document = this.root.document;
                    return Boolean(document && 'onreadystatechange' in document.createElement('script'));
                }
                canUsePostMessage() {
                    const root = this.root;
                    if (root.postMessage && !root.importScripts) {
                        let postMessageIsAsynchronous = true;
                        let oldOnMessage = root.onmessage;
                        root.onmessage = function () {
                            postMessageIsAsynchronous = false;
                        };
                        root.postMessage('', '*');
                        root.onmessage = oldOnMessage;
                        return postMessageIsAsynchronous;
                    }
                    return false;
                }
                partiallyApplied(handler, ...args) {
                    let fn = function result() {
                        const { handler, args } = result;
                        if (typeof handler === 'function') {
                            handler.apply(undefined, args);
                        }
                        else {
                            (new Function('' + handler))();
                        }
                    };
                    fn.handler = handler;
                    fn.args = args;
                    return fn;
                }
                addFromSetImmediateArguments(args) {
                    this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
                    return this.nextHandle++;
                }
                createProcessNextTickSetImmediate() {
                    let fn = function setImmediate() {
                        const { instance } = setImmediate;
                        let handle = instance.addFromSetImmediateArguments(arguments);
                        instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
                        return handle;
                    };
                    fn.instance = this;
                    return fn;
                }
                createPostMessageSetImmediate() {
                    const root = this.root;
                    let messagePrefix = 'setImmediate$' + root.Math.random() + '$';
                    let onGlobalMessage = function globalMessageHandler(event) {
                        const instance = globalMessageHandler.instance;
                        if (event.source === root &&
                            typeof event.data === 'string' &&
                            event.data.indexOf(messagePrefix) === 0) {
                            instance.runIfPresent(+event.data.slice(messagePrefix.length));
                        }
                    };
                    onGlobalMessage.instance = this;
                    root.addEventListener('message', onGlobalMessage, false);
                    let fn = function setImmediate() {
                        const { messagePrefix, instance } = setImmediate;
                        let handle = instance.addFromSetImmediateArguments(arguments);
                        instance.root.postMessage(messagePrefix + handle, '*');
                        return handle;
                    };
                    fn.instance = this;
                    fn.messagePrefix = messagePrefix;
                    return fn;
                }
                runIfPresent(handle) {
                    if (this.currentlyRunningATask) {
                        this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
                    }
                    else {
                        let task = this.tasksByHandle[handle];
                        if (task) {
                            this.currentlyRunningATask = true;
                            try {
                                task();
                            }
                            finally {
                                this.clearImmediate(handle);
                                this.currentlyRunningATask = false;
                            }
                        }
                    }
                }
                createMessageChannelSetImmediate() {
                    let channel = new this.root.MessageChannel();
                    channel.port1.onmessage = (event) => {
                        let handle = event.data;
                        this.runIfPresent(handle);
                    };
                    let fn = function setImmediate() {
                        const { channel, instance } = setImmediate;
                        let handle = instance.addFromSetImmediateArguments(arguments);
                        channel.port2.postMessage(handle);
                        return handle;
                    };
                    fn.channel = channel;
                    fn.instance = this;
                    return fn;
                }
                createReadyStateChangeSetImmediate() {
                    let fn = function setImmediate() {
                        const instance = setImmediate.instance;
                        const root = instance.root;
                        const doc = root.document;
                        const html = doc.documentElement;
                        let handle = instance.addFromSetImmediateArguments(arguments);
                        let script = doc.createElement('script');
                        script.onreadystatechange = () => {
                            instance.runIfPresent(handle);
                            script.onreadystatechange = null;
                            html.removeChild(script);
                            script = null;
                        };
                        html.appendChild(script);
                        return handle;
                    };
                    fn.instance = this;
                    return fn;
                }
                createSetTimeoutSetImmediate() {
                    let fn = function setImmediate() {
                        const instance = setImmediate.instance;
                        let handle = instance.addFromSetImmediateArguments(arguments);
                        instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
                        return handle;
                    };
                    fn.instance = this;
                    return fn;
                }
            }
            exports_1("ImmediateDefinition", ImmediateDefinition);
            exports_1("Immediate", Immediate = new ImmediateDefinition(root_1.root));
        }
    }
});
