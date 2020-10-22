import {BooleanField, CharField, DateField, Field, NumberField} from './fields';

type Errors = {
    [Key: string]: string[];
}

type Dict = {
    [Key: string]: any;
}

enum ValueType {
    INT = 'INT',
    FLOAT = 'FLOAT',
    CHAR = 'CHAR',
    BOOL = 'BOOL',
    DATE = 'DATE',
    TIMESTAMPTZ = 'TIMESTAMPTZ'
}

type Prop = {
    name: string;
    value: any;
    is_mandatory: boolean;
    value_type: ValueType;
}

abstract class AbstractForm {
    protected errors: Errors;
    protected fields: Field<any>[];

    constructor() {
        this.errors = {};
        this.fields = [];
    }

    isValid(): boolean {
        const errors: Errors = {};
        for (const field of this.fields) {
            if (!field.isValid()) {
                errors[field.name] = field.errors;
            }
        }
        this.errors = errors;
        return Object.keys(this.errors).length === 0;
    }

    flatten(name: string): string {
        return this.errors[name] ? this.errors[name].join('<br>') : '';
    }

    fieldErrors(name: string): string[] {
        return this.errors[name] || [];
    }

    abstract toJSON(onlyChanged: boolean): any

    encode(): string {
        return this.fields
            .map(f => encodeURIComponent(f.name) + '=' + encodeURIComponent(f.value))
            .join('&');
    }

    changed(): Dict {
        const res: Dict = {};
        this.fields.forEach(f => {
            if (f.changed) {
                res[f.name] = f.value;
            }
        });
        return res;
    }

    private registerProperty(f: Field<any>, index: number) {
        Object.defineProperty(this, f.name, {
            configurable: true,
            enumerable: true,
            get(): any {
                return f.repr ? f.repr() : this.fields[index].value;
            },
            set(v: any): void {
                this.fields[index].value = v;
            }
        });
    }

    protected set field(f: Field<any>) {
        this.fields.push(f);
        this.registerProperty(f, this.fields.length - 1);
    }

    protected reset(): void {
        for (const field of this.fields) {
            field.reset();
        }
    }

}

export class Form extends AbstractForm {
    toJSON(onlyChanged: boolean = true): any {
        const res: Dict = {};
        this.fields.forEach(f => {
            if (onlyChanged && f.changed || !onlyChanged) {
                res[f.name] = f.value;
            }
        });
        return res;
    }
}

export class DynamicForm extends AbstractForm {
    constructor(props: Prop[]) {
        super();
        for (const prop of props) {
            this.field = DynamicForm.buildField(prop);
        }
    }

    toJSON(onlyChanged: boolean = true): any {
        const res: Array<{
            key: string;
            value: any;
        }> = [];
        this.fields.forEach(f => {
            if (onlyChanged && f.changed || !onlyChanged) {
                res.push({
                    key: f.name,
                    value: f.value
                });
            }
        });
        return res;
    }

    static buildField(prop: Prop) {
        switch (prop.value_type) {
            case ValueType.CHAR:
                return new CharField(prop.name, prop.value, prop.is_mandatory);
            case ValueType.BOOL:
                return new BooleanField(prop.name, prop.value, prop.is_mandatory);
            case ValueType.INT:
            case ValueType.FLOAT:
                return new NumberField(prop.name, prop.value, prop.is_mandatory);
            case ValueType.DATE:
            case ValueType.TIMESTAMPTZ:
                return new DateField(prop.name, prop.value, prop.is_mandatory);
            default:
                return new CharField(prop.name, prop.value, prop.is_mandatory);
        }
    }

}