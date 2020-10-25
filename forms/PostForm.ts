import {Form} from '../src/form';
import {ArrayField, BaseField, BooleanField, CharField, ChoiceField, NumberField} from '../src/fields';
import {FormFile, NullOption, Option} from '../src/values';

export const statuses = [
    new Option('on_moderation', 'В модерации'),
    new Option('active', 'Активно'),
    new Option('inactive', 'Не активно'),
    new Option('spam', 'Спам')
];

export class PostForm extends Form {
    constructor() {
        super();
        this.field = new ChoiceField('category', NullOption, true, []);
        this.field = new CharField('title', null, true);
        this.field = new CharField('body', null, true);
        this.field = new NumberField('price', null, false);
        this.field = new BooleanField('is_price_negotiable', false);
        this.field = new ChoiceField('status', statuses[0], true, statuses);
        this.field = new BaseField('location', null, true);
        this.field = new CharField('address', '', true);
        this.field = new ArrayField<FormFile>('images');
    }
    setLocation(coords:any) {
        if (Array.isArray(coords)) {
            // @ts-ignore
            this.location = `POINT(${coords[0]} ${coords[1]})`;
        } else {
            // @ts-ignore
            this.location = coords;
        }
    }

    getLocation() {
        // @ts-ignore
        if (typeof this.location === 'string') {
            // @ts-ignore
            const loc = this.location.replace(/(POINT|\(|\))/g, '');
            return loc.split(' ').map(Number);
        }
        // @ts-ignore
        return this.location;
    }
}

