import {Document} from 'mongoose';

export interface BaseModelInterface extends Document{
    save(): any;
    load(data): any;
    saveData(data): any;
    get(id, next): any;
    findByIdAndUpdate(id, data, options): any;
    createdAt: string
    updatedAt: string;
}
