import { Schema } from 'mongoose';

export const User = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    favoriteNotes: [ {type: Schema.Types.String, ref: 'Note'} ],
});
