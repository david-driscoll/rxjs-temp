System.register(['./root', './isArray', './isPromise', '../Observable', '../util/SymbolShim', '../InnerSubscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1, isArray_1, isPromise_1, Observable_1, SymbolShim_1, InnerSubscriber_1;
    function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
        let destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
        if (destination.isUnsubscribed) {
            return;
        }
        if (result instanceof Observable_1.Observable) {
            if (result._isScalar) {
                destination.next(result.value);
                destination.complete();
                return;
            }
            else {
                return result.subscribe(destination);
            }
        }
        if (isArray_1.isArray(result)) {
            for (let i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
                destination.next(result[i]);
            }
            if (!destination.isUnsubscribed) {
                destination.complete();
            }
        }
        else if (isPromise_1.isPromise(result)) {
            result.then((value) => {
                if (!destination.isUnsubscribed) {
                    destination.next(value);
                    destination.complete();
                }
            }, (err) => destination.error(err))
                .then(null, (err) => {
                root_1.root.setTimeout(() => { throw err; });
            });
            return destination;
        }
        else if (typeof result[SymbolShim_1.SymbolShim.iterator] === 'function') {
            for (let item of result) {
                destination.next(item);
                if (destination.isUnsubscribed) {
                    break;
                }
            }
            if (!destination.isUnsubscribed) {
                destination.complete();
            }
        }
        else if (typeof result[SymbolShim_1.SymbolShim.observable] === 'function') {
            const obs = result[SymbolShim_1.SymbolShim.observable]();
            if (typeof obs.subscribe !== 'function') {
                destination.error('invalid observable');
            }
            else {
                return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
            }
        }
        else {
            destination.error(new TypeError('unknown type returned'));
        }
    }
    exports_1("subscribeToResult", subscribeToResult);
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (isPromise_1_1) {
                isPromise_1 = isPromise_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (SymbolShim_1_1) {
                SymbolShim_1 = SymbolShim_1_1;
            },
            function (InnerSubscriber_1_1) {
                InnerSubscriber_1 = InnerSubscriber_1_1;
            }],
        execute: function() {
        }
    }
});
