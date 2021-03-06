"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var UsingObservable = (function (_super) {
    __extends(UsingObservable, _super);
    function UsingObservable(resourceFactory, observableFactory) {
        _super.call(this);
        this.resourceFactory = resourceFactory;
        this.observableFactory = observableFactory;
    }
    UsingObservable.create = function (resourceFactory, observableFactory) {
        return new UsingObservable(resourceFactory, observableFactory);
    };
    UsingObservable.prototype._subscribe = function (subscriber) {
        var _a = this, resourceFactory = _a.resourceFactory, observableFactory = _a.observableFactory;
        var resource, source, error, errorHappened = false;
        try {
            resource = resourceFactory();
        }
        catch (e) {
            error = e;
            errorHappened = true;
        }
        if (errorHappened) {
            subscriber.error(error);
        }
        else {
            subscriber.add(resource);
            try {
                source = observableFactory(resource);
            }
            catch (e) {
                error = e;
                errorHappened = true;
            }
            if (errorHappened) {
                subscriber.error(error);
            }
            else {
                return source.subscribe(subscriber);
            }
        }
    };
    return UsingObservable;
}(Observable_1.Observable));
exports.UsingObservable = UsingObservable;
//# sourceMappingURL=UsingObservable.js.map