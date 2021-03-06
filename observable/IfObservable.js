"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var IfObservable = (function (_super) {
    __extends(IfObservable, _super);
    function IfObservable(condition, thenSource, elseSource) {
        _super.call(this);
        this.condition = condition;
        this.thenSource = thenSource;
        this.elseSource = elseSource;
    }
    IfObservable.create = function (condition, thenSource, elseSource) {
        return new IfObservable(condition, thenSource, elseSource);
    };
    IfObservable.prototype._subscribe = function (subscriber) {
        var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
        var result, error, errorHappened = false;
        try {
            result = condition();
        }
        catch (e) {
            error = e;
            errorHappened = true;
        }
        if (errorHappened) {
            subscriber.error(error);
        }
        else if (result && thenSource) {
            return thenSource.subscribe(subscriber);
        }
        else if (elseSource) {
            return elseSource.subscribe(subscriber);
        }
        else {
            subscriber.complete();
        }
    };
    return IfObservable;
}(Observable_1.Observable));
exports.IfObservable = IfObservable;
//# sourceMappingURL=IfObservable.js.map