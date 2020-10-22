"use strict";
exports.__esModule = true;
exports.UUID = exports.LenWithin = exports.MinLen = exports.MaxLen = exports.Within = exports.Min = exports.Max = void 0;
function Max(limit) {
    return function (value) {
        if (value > limit) {
            throw "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 \u0447\u0435\u043C " + limit;
        }
    };
}
exports.Max = Max;
function Min(limit) {
    return function (value) {
        if (value < limit) {
            throw "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0447\u0435\u043C " + limit;
        }
    };
}
exports.Min = Min;
function Within(low, high) {
    return function (value) {
        if (!(low < value && value < high)) {
            throw "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 \u043E\u0442 " + low + " \u0434\u043E " + high;
        }
    };
}
exports.Within = Within;
function MaxLen(length) {
    return function (value) {
        if (value.length > length) {
            throw "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C " + length;
        }
    };
}
exports.MaxLen = MaxLen;
function MinLen(length) {
    return function (value) {
        if (value.length < length) {
            throw "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C " + length;
        }
    };
}
exports.MinLen = MinLen;
function LenWithin(low, high) {
    return function (value) {
        if (!(low < value.length && value.length < high)) {
            throw "\u0414\u043B\u0438\u043D\u0430 \u0441\u0438\u0432\u043E\u043B\u043E\u0432 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 \u043E\u0442 " + low + " \u0434\u043E " + high;
        }
    };
}
exports.LenWithin = LenWithin;
function UUID(value) {
    var uuid = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
    if (!uuid.test(value)) {
        throw 'Введите UUID';
    }
}
exports.UUID = UUID;
