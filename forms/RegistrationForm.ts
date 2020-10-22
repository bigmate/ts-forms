import {Form} from '../src/form';
import {CharField} from '../src/fields';

export class RegistrationForm extends Form {
    constructor() {
        super();
        this.field = new CharField('first_name', null, true);
        this.field = new CharField('last_name', null, false);
        this.field = new CharField('mobile_number', null, true);
        this.field = new CharField('password', null, true);
    }
}
