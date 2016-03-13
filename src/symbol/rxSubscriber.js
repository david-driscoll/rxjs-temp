System.register(['../util/SymbolShim'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SymbolShim_1;
    var rxSubscriber;
    return {
        setters:[
            function (SymbolShim_1_1) {
                SymbolShim_1 = SymbolShim_1_1;
            }],
        execute: function() {
            exports_1("rxSubscriber", rxSubscriber = SymbolShim_1.SymbolShim.for('rxSubscriber'));
        }
    }
});
