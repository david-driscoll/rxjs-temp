System.register(['./root'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1;
    var id, SymbolShim;
    function polyfillSymbol(root) {
        const Symbol = ensureSymbol(root);
        ensureIterator(Symbol, root);
        ensureObservable(Symbol);
        ensureFor(Symbol);
        return Symbol;
    }
    exports_1("polyfillSymbol", polyfillSymbol);
    function ensureFor(Symbol) {
        if (!Symbol.for) {
            Symbol.for = symbolForPolyfill;
        }
    }
    exports_1("ensureFor", ensureFor);
    function ensureSymbol(root) {
        if (!root.Symbol) {
            root.Symbol = function symbolFuncPolyfill(description) {
                return `@@Symbol(${description}):${id++}`;
            };
        }
        return root.Symbol;
    }
    exports_1("ensureSymbol", ensureSymbol);
    function symbolForPolyfill(key) {
        return '@@' + key;
    }
    exports_1("symbolForPolyfill", symbolForPolyfill);
    function ensureIterator(Symbol, root) {
        if (!Symbol.iterator) {
            if (typeof Symbol.for === 'function') {
                Symbol.iterator = Symbol.for('iterator');
            }
            else if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
                Symbol.iterator = '@@iterator';
            }
            else if (root.Map) {
                let keys = Object.getOwnPropertyNames(root.Map.prototype);
                for (let i = 0; i < keys.length; ++i) {
                    let key = keys[i];
                    if (key !== 'entries' && key !== 'size' && root.Map.prototype[key] === root.Map.prototype['entries']) {
                        Symbol.iterator = key;
                        break;
                    }
                }
            }
            else {
                Symbol.iterator = '@@iterator';
            }
        }
    }
    exports_1("ensureIterator", ensureIterator);
    function ensureObservable(Symbol) {
        if (!Symbol.observable) {
            if (typeof Symbol.for === 'function') {
                Symbol.observable = Symbol.for('observable');
            }
            else {
                Symbol.observable = '@@observable';
            }
        }
    }
    exports_1("ensureObservable", ensureObservable);
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            }],
        execute: function() {
            id = 0;
            exports_1("SymbolShim", SymbolShim = polyfillSymbol(root_1.root));
        }
    }
});
