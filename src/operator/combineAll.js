System.register(['./combineLatest'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var combineLatest_1;
    function combineAll(project) {
        return this.lift(new combineLatest_1.CombineLatestOperator(project));
    }
    exports_1("combineAll", combineAll);
    return {
        setters:[
            function (combineLatest_1_1) {
                combineLatest_1 = combineLatest_1_1;
            }],
        execute: function() {
        }
    }
});
