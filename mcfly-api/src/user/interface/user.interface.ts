import { Note } from '../../note/interface/note.interface';
import { Document } from 'mongoose';

export interface User extends Document {
    readonly name: string;
    readonly email: string;
    readonly favoriteNotes: Array<string>;
}