import { Schema } from 'mongoose';

export const Note = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    createdBy: {type: Schema.Types.String, ref: 'User'},
    createdAt: {type: Date, default: Date.now()}
});
