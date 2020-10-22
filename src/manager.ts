import {Presenter} from './values';

export interface FormManager {
    save(): Promise<Presenter>
    delete(): Promise<Presenter>
}