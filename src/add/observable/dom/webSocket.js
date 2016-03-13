System.register(['../../../Observable', '../../../observable/dom/WebSocketSubject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, WebSocketSubject_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (WebSocketSubject_1_1) {
                WebSocketSubject_1 = WebSocketSubject_1_1;
            }],
        execute: function() {
            Observable_1.Observable.webSocket = WebSocketSubject_1.WebSocketSubject.create;
        }
    }
});
