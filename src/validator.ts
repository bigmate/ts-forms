export type validator<T> = (value: T) => void


export function Max(limit: number): validator<number> {
    return function (value: number) {
        if (value > limit) {
            throw new Error(`Значение должно быть меньше чем ${limit}`);
        }
    };
}

export function Min(limit: number): validator<number> {
    return function (value: number) {
        if (value < limit) {
            throw new Error(`Значение должно быть больше чем ${limit}`);
        }
    };
}

export function Within(low: number, high: number): validator<number> {
    return function (value: number) {
        if (!(low < value && value < high)) {
            throw new Error(`Значение должно быть в пределах от ${low} до ${high}`);
        }
    };
}

export function MaxLen(length: number): validator<string> {
    return function (value: string) {
        if (value.length > length) {
            throw new Error(`Максимальная длина символов должна быть ${length}`);
        }
    };
}

export function MinLen(length: number): validator<string> {
    return function (value: string) {
        if (value.length < length) {
            throw new Error(`Минимальная длина символов должна быть ${length}`);
        }
    };
}

export function LenWithin(low: number, high: number): validator<string> {
    return function (value: string) {
        if (!(low < value.length && value.length < high)) {
            throw new Error(`Длина сиволов должно быть в пределах от ${low} до ${high}`);
        }
    };
}

export function UUID(value: string) {
    const uuid = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
    if (!uuid.test(value)) {
        throw new Error('Введите UUID');
    }
}
