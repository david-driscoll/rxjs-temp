System.register(['./zip'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var zip_1;
    function zipAll(project) {
        return this.lift(new zip_1.ZipOperator(project));
    }
    exports_1("zipAll", zipAll);
    return {
        setters:[
            function (zip_1_1) {
                zip_1 = zip_1_1;
            }],
        execute: function() {
        }
    }
});
