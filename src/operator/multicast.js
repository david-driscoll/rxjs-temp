System.register(['../observable/ConnectableObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ConnectableObservable_1;
    function multicast(subjectOrSubjectFactory) {
        let subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        }
        else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        return new ConnectableObservable_1.ConnectableObservable(this, subjectFactory);
    }
    exports_1("multicast", multicast);
    return {
        setters:[
            function (ConnectableObservable_1_1) {
                ConnectableObservable_1 = ConnectableObservable_1_1;
            }],
        execute: function() {
        }
    }
});
