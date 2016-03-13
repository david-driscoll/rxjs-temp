System.register(['../observable/ArrayObservable', './mergeAll', '../util/isScheduler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ArrayObservable_1, mergeAll_1, isScheduler_1;
    function merge(...observables) {
        observables.unshift(this);
        return mergeStatic.apply(this, observables);
    }
    exports_1("merge", merge);
    function mergeStatic(...observables) {
        let concurrent = Number.POSITIVE_INFINITY;
        let scheduler = null;
        let last = observables[observables.length - 1];
        if (isScheduler_1.isScheduler(last)) {
            scheduler = observables.pop();
            if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
                concurrent = observables.pop();
            }
        }
        else if (typeof last === 'number') {
            concurrent = observables.pop();
        }
        if (observables.length === 1) {
            return observables[0];
        }
        return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
    }
    exports_1("mergeStatic", mergeStatic);
    return {
        setters:[
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (mergeAll_1_1) {
                mergeAll_1 = mergeAll_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }],
        execute: function() {
        }
    }
});
