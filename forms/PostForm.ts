import {Form} from '../src/form';
import {ArrayField, BaseField, BooleanField, CharField, ChoiceField, NumberField} from '../src/fields';
import {FormFile, Option} from '../src/values';


export class PostForm extends Form {
    constructor() {
        super();
        this.field = new ChoiceField('category', null, true, []);
        this.field = new CharField('title', null, true);
        this.field = new CharField('body', null, true);
        this.field = new NumberField('price', null, false);
        this.field = new BooleanField('is_price_negotiable', false);
        this.field = new ChoiceField('status',
            new Option('on_moderation', 'В модерации'),
            true, [
                new Option('on_moderation', 'В модерации'),
                new Option('active', 'Активно'),
                new Option('inactive', 'Не активно'),
                new Option('spam', 'Спам')
            ]);
        this.field = new BaseField('location', null, true);
        this.field = new CharField('address', '', true);
        this.field = new ArrayField<FormFile>('images', );
    }
}

