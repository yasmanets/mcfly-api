import { User } from '../../user/interface/user.interface';
import { Document } from 'mongoose';

export interface Note extends Document {
    readonly title: string;
    readonly body: string;
    readonly createdBy: string;
    readonly createdAt: Date;
}