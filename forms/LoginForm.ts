import {Form} from '../src/form';
import {BaseField, CharField} from '../src/fields';
import {NullMobileNumber} from '../src/values';

export class LoginForm extends Form {
    constructor() {
        super();
        this.field = new BaseField('mobile_number', NullMobileNumber, true)
        this.field = new CharField('password', null, true)
    }
}