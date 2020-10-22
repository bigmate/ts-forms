import {Form} from '../src/form';
import {CharField} from '../src/fields';

export class LoginForm extends Form {
    constructor() {
        super();
        this.field = new CharField('mobile_number', null, true)
        this.field = new CharField('password', null, true)
    }
}