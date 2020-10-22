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
exports.__esModule = true;
exports.DynamicForm = exports.Form = void 0;
var fields_1 = require("./fields");
var ValueType;
(function (ValueType) {
    ValueType["INT"] = "INT";
    ValueType["FLOAT"] = "FLOAT";
    ValueType["CHAR"] = "CHAR";
    ValueType["BOOL"] = "BOOL";
    ValueType["DATE"] = "DATE";
    ValueType["TIMESTAMPTZ"] = "TIMESTAMPTZ";
})(ValueType || (ValueType = {}));
var AbstractForm = /** @class */ (function () {
    function AbstractForm() {
        this.errors = {};
        this.fields = [];
    }
    AbstractForm.prototype.isValid = function () {
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (!field.isValid()) {
                this.errors[field.name] = field.errors;
            }
            else {
                delete this.errors[field.name];
            }
        }
        return Object.keys(this.errors).length === 0;
    };
    AbstractForm.prototype.flatten = function (name) {
        return this.errors[name].join('<br>');
    };
    AbstractForm.prototype.fieldError = function (name) {
        return this.errors[name] || [];
    };
    AbstractForm.prototype.changed = function () {
        var res = {};
        this.fields.forEach(function (f) {
            if (f.changed) {
                res[f.name] = f.value;
            }
        });
        return res;
    };
    return AbstractForm;
}());
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Form.prototype.marshal = function (onlyChanged) {
        if (onlyChanged === void 0) { onlyChanged = true; }
        var res = {};
        this.fields.forEach(function (f) {
            if (onlyChanged && f.changed || !onlyChanged) {
                res[f.name] = f.value;
            }
        });
        return JSON.stringify(res);
    };
    return Form;
}(AbstractForm));
exports.Form = Form;
var DynamicForm = /** @class */ (function (_super) {
    __extends(DynamicForm, _super);
    function DynamicForm(props) {
        var _this = _super.call(this) || this;
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var prop = props_1[_i];
            _this.fields.push(DynamicForm.buildField(prop));
        }
        return _this;
    }
    DynamicForm.prototype.marshal = function (onlyChanged) {
        if (onlyChanged === void 0) { onlyChanged = true; }
        var res = [];
        this.fields.forEach(function (f) {
            if (onlyChanged && f.changed || !onlyChanged) {
                res.push({
                    key: f.name,
                    value: f.value
                });
            }
        });
        return JSON.stringify(res);
    };
    DynamicForm.buildField = function (prop) {
        switch (prop.value_type) {
            case ValueType.CHAR:
                return new fields_1.CharField(prop.name, prop.value, prop.is_mandatory);
            case ValueType.BOOL:
                return new fields_1.BooleanField(prop.name, prop.value, prop.is_mandatory);
            case ValueType.INT:
            case ValueType.FLOAT:
                return new fields_1.NumberField(prop.name, prop.value, prop.is_mandatory);
            case ValueType.DATE:
            case ValueType.TIMESTAMPTZ:
                return new fields_1.DateField(prop.name, prop.value, prop.is_mandatory);
            default:
                return new fields_1.CharField(prop.name, prop.value, prop.is_mandatory);
        }
    };
    return DynamicForm;
}(AbstractForm));
exports.DynamicForm = DynamicForm;
