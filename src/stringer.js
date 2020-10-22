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
exports.FileSize = void 0;
var Stringer = /** @class */ (function () {
    function Stringer(value) {
        this.value = value;
    }
    return Stringer;
}());
var FileSize = /** @class */ (function (_super) {
    __extends(FileSize, _super);
    function FileSize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FileSize.prototype, "power", {
        get: function () {
            var value = this.value;
            var level = 0;
            while (value > 0 && level < 4) {
                value >>= 10;
                level++;
            }
            level--;
            return level >= 0 ? level : 0;
        },
        enumerable: false,
        configurable: true
    });
    FileSize.prototype.toString = function () {
        var power = this.power;
        var suffixes = ['байт', 'кб', 'мб', 'гб'];
        var size = this.value / (1 << (power * 10));
        return size.toLocaleString('ru', {
            maximumFractionDigits: 2
        }) + suffixes[power];
    };
    return FileSize;
}(Stringer));
exports.FileSize = FileSize;
