"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ChoiceField = exports.FileField = exports.DateField = exports.BooleanField = exports.NumberField = exports.CharField = void 0;
var stringer_1 = require("./stringer");
var AbstractField = /** @class */ (function () {
    function AbstractField(name, init, required) {
        if (init === void 0) { init = null; }
        if (required === void 0) { required = true; }
        var validators = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            validators[_i - 3] = arguments[_i];
        }
        this.name = name;
        this.value = init;
        this.initValue = init;
        this.validators = validators;
        this._errors = [];
        this.required = required;
    }
    Object.defineProperty(AbstractField.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractField.prototype, "changed", {
        get: function () {
            return this.value === this.initValue;
        },
        enumerable: false,
        configurable: true
    });
    AbstractField.prototype.isValid = function () {
        this._errors = [];
        if (this.value === null && this.required) {
            this._errors.push('Это обязательное поле');
            return false;
        }
        else if (this.value === null && !this.required) {
            return true;
        }
        for (var _i = 0, _a = this.validators; _i < _a.length; _i++) {
            var validator = _a[_i];
            try {
                validator(this.value);
            }
            catch (e) {
                this._errors.push(e.toString());
            }
        }
        return this._errors.length === 0;
    };
    return AbstractField;
}());
var CharField = /** @class */ (function (_super) {
    __extends(CharField, _super);
    function CharField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CharField;
}(AbstractField));
exports.CharField = CharField;
var NumberField = /** @class */ (function (_super) {
    __extends(NumberField, _super);
    function NumberField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NumberField;
}(AbstractField));
exports.NumberField = NumberField;
var BooleanField = /** @class */ (function (_super) {
    __extends(BooleanField, _super);
    function BooleanField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BooleanField;
}(AbstractField));
exports.BooleanField = BooleanField;
var DateField = /** @class */ (function (_super) {
    __extends(DateField, _super);
    function DateField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DateField;
}(AbstractField));
exports.DateField = DateField;
var FileField = /** @class */ (function (_super) {
    __extends(FileField, _super);
    function FileField(name, init, required, low, high, extensions) {
        if (required === void 0) { required = true; }
        if (extensions === void 0) { extensions = ['jpeg', 'jpg', 'png']; }
        var validators = [];
        for (var _i = 6; _i < arguments.length; _i++) {
            validators[_i - 6] = arguments[_i];
        }
        var _this = _super.apply(this, __spreadArrays([name, init, required], validators)) || this;
        _this.low = low;
        _this.high = high;
        _this.extensions = extensions;
        _this.validators.push(_this.fileSizeWithin);
        _this.validators.push(_this.allowedExtension);
        return _this;
    }
    FileField.prototype.fileSizeWithin = function (value) {
        if (!(this.low < value.size && value.size < this.high)) {
            throw "\u0420\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 \u043E\u0442 " + new stringer_1.FileSize(this.low) + " \u0434\u043E " + new stringer_1.FileSize(this.high);
        }
    };
    FileField.prototype.allowedExtension = function (value) {
        var chunks = value.name.split('.');
        var ext = chunks[chunks.length - 1].toLowerCase();
        for (var _i = 0, _a = this.extensions; _i < _a.length; _i++) {
            var extension = _a[_i];
            if (ext === extension) {
                return;
            }
        }
        throw "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0442\u0438\u043F \u0444\u0430\u0439\u043B\u0430 " + this.value.name + ", \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 \u044D\u0442\u0438\u0445: " + this.extensions.join(', ');
    };
    return FileField;
}(AbstractField));
exports.FileField = FileField;
var ChoiceField = /** @class */ (function (_super) {
    __extends(ChoiceField, _super);
    function ChoiceField(name, init, required, options) {
        if (required === void 0) { required = true; }
        var validators = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            validators[_i - 4] = arguments[_i];
        }
        var _this = _super.apply(this, __spreadArrays([name, init, required], validators)) || this;
        _this.options = options;
        _this.validators.push(_this.valueInOptions);
        return _this;
    }
    ChoiceField.prototype.valueInOptions = function (value) {
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.value === this.value.value) {
                return;
            }
        }
        throw "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 " + this.optionsToString;
    };
    Object.defineProperty(ChoiceField.prototype, "optionsToString", {
        get: function () {
            return this.options.map(function (o) { return o.repr(); }).join(', ');
        },
        enumerable: false,
        configurable: true
    });
    return ChoiceField;
}(AbstractField));
exports.ChoiceField = ChoiceField;
