import {validator} from './validator';
import {FileSize} from './stringer';
import {Choice, FormFile} from './values';

export interface Field<T> {
    name: string;
    value: T | null;
    errors: string[];
    isValid(): boolean;
    reset(): void;
    changed: boolean;
}

abstract class AbstractField<T> implements Field<T> {
    readonly name: string;
    public value: T | null;
    private readonly initValue: T | null;
    protected validators: validator<T>[];
    private _errors: string[];
    private readonly required: boolean;

    constructor(name: string, init: T | null = null, required: boolean = true, ...validators: validator<T>[]) {
        this.name = name;
        this.value = init;
        this.initValue = init;
        this.validators = validators;
        this._errors = [];
        this.required = required;
    }

    get errors(): string[] {
        return this._errors;
    }

    get changed(): boolean {
        return this.value !== this.initValue;
    }
    get isNull():boolean {
        return this.value === null
    }
    isValid(): boolean {
        this._errors = [];
        if (this.isNull && this.required) {
            this._errors.push('Это обязательное поле');
            return false;
        } else if (this.isNull && !this.required) {
            return true;
        }
        for (const validator of this.validators) {
            try {
                validator(this.value!);
            } catch (e) {
                this._errors.push(e.message);
            }
        }
        return this._errors.length === 0;
    }

    public reset(): void {
        this.value = this.initValue;
    }
}

export class BaseField extends AbstractField<any> {
    public get isNull(): boolean {
        return this.value === null ? true : this.value.value === null;
    }
}

export class CharField extends AbstractField<string> {
}

export class NumberField extends AbstractField<number> {
}

export class BooleanField extends AbstractField<boolean> {
}

export class DateField extends AbstractField<Date> {
}

export class FileField extends AbstractField<FormFile> {
    private readonly low: number;
    private readonly high: number;
    private readonly extensions: string[];

    constructor(
        name: string,
        init: FormFile | null = null,
        required: boolean = true,
        low: number, high: number,
        extensions: string[] = ['jpeg', 'jpg', 'png'],
        ...validators: validator<FormFile>[]
    ) {
        super(name, init, required, ...validators);
        this.low = low;
        this.high = high;
        this.extensions = extensions;
        this.validators.push(this.fileSizeWithin.bind(this));
        this.validators.push(this.allowedExtension.bind(this));
    }

    fileSizeWithin(value: FormFile): void {
        if (!(this.low < value.size && value.size < this.high)) {
            throw new Error(`Размер файла должно быть в пределах от ${new FileSize(this.low)} до ${new FileSize(this.high)}`);
        }
    }

    allowedExtension(value: FormFile): void {
        const chunks = value.name.split('.');
        const ext = chunks[chunks.length - 1].toLowerCase();
        for (const extension of this.extensions) {
            if (ext === extension) {
                return;
            }
        }
        throw new Error(`Неправильный тип файла ${this.value!.name}, выберите один из этих: ${this.extensions.join(', ')}`);
    }

}

export class ChoiceField extends AbstractField<Choice> {
    private readonly options: Choice[];

    constructor(
        name: string,
        init: Choice | null = null,
        required: boolean = true,
        options: Choice[] = [],
        ...validators: validator<Choice>[]
    ) {
        super(name, init, required, ...validators);
        this.options = options;
        this.validators.push(this.valueInOptions.bind(this));
    }

    public get isNull(): boolean {
        return this.value === null ? true : this.value.value === null;
    }

    valueInOptions(value: Choice): void {
        if (this.options.length === 0) return;
        for (const option of this.options) {
            if (option.value === value.value) {
                return;
            }
        }
        throw new Error(`Выберите один из ${this.optionsToString}`);
    }

    get optionsToString(): string {
        return this.options.map(o => o.toString()).join(', ');
    }

}

export class ArrayField<T> extends AbstractField<T> {
}
