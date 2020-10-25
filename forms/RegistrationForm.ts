import {Form} from '../src/form';
import {BaseField, CharField} from '../src/fields';
import {NullMobileNumber} from '../src/values';

export class RegistrationForm extends Form {
    constructor() {
        super();
        this.field = new CharField('first_name', null, true);
        this.field = new CharField('last_name', null, false);
        this.field = new BaseField('mobile_number', NullMobileNumber, true);
        this.field = new CharField('password', null, true);
    }
}
