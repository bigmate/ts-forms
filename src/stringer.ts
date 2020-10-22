import {Presenter} from './values';

abstract class Stringer<T> implements Presenter {
    protected value: T;

    constructor(value: T) {
        this.value = value;
    }

    abstract toString(): string
}

export class FileSize extends Stringer<number> {
    get power(): number {
        let value = this.value;
        let level = 0;
        while (value > 0 && level < 4) {
            value >>= 10;
            level++;
        }
        level--;
        return level >= 0 ? level : 0;
    }

    toString(): string {
        const power = this.power;
        const suffixes = ['байт', 'кб', 'мб', 'гб'];
        const size = this.value / (1 << (power * 10));
        return size.toLocaleString('ru', {
            maximumFractionDigits: 2
        }) + suffixes[power];
    }
}