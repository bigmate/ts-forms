import {Form} from '../src/form';
import {FileField} from '../src/fields';

export class FileForm extends Form {
    constructor() {
        super();
        this.field = new FileField('file', null, true, 1 << 20, 5 << 20);
    }
}