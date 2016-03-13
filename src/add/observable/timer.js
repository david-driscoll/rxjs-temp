System.register(['../../Observable', '../../observable/TimerObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, TimerObservable_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (TimerObservable_1_1) {
                TimerObservable_1 = TimerObservable_1_1;
            }],
        execute: function() {
            Observable_1.Observable.timer = TimerObservable_1.TimerObservable.create;
        }
    }
});
