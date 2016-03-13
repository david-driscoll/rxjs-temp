System.register(['../util/isScheduler', '../observable/ArrayObservable', './mergeAll'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isScheduler_1, ArrayObservable_1, mergeAll_1;
    function concat(...observables) {
        return concatStatic(this, ...observables);
    }
    exports_1("concat", concat);
    function concatStatic(...observables) {
        let scheduler = null;
        let args = observables;
        if (isScheduler_1.isScheduler(args[observables.length - 1])) {
            scheduler = args.pop();
        }
        return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
    }
    exports_1("concatStatic", concatStatic);
    return {
        setters:[
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            },
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (mergeAll_1_1) {
                mergeAll_1 = mergeAll_1_1;
            }],
        execute: function() {
        }
    }
});
