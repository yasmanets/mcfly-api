import { User } from 'src/user/interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NoteService } from 'src/note/note.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') readonly userModel: Model<User>,
        private noteService: NoteService,
    ) {}

    async createUser(user: UserDTO): Promise<User> {
        if (!user.name || !user.email) {
            throw new Error('Name and email are required');
        }
        const newUser = await new this.userModel(user)
        try {
            await newUser.save();
        } catch (error) {
            throw new Error('Saving the new user');
        }        
        return newUser;
    }

    async getUsers(): Promise<User[]> {
        let users;
        try {
            users = await this.userModel.find();
        } catch (error) {
            throw new Error('Getting all users');
        }
        return users;
    }

    async getUserById(userId: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById(userId);
        } catch (error) {
            throw new Error(`Getting user: ${userId}`);
        }
        return user;
    }

    async markNoteAsFavorite(userId: string, noteId: string): Promise<User> {
        let user
        try {
            user = await this.userModel.findById(userId);
        } catch (error) {
            throw new Error(`Getting user: ${userId}`);
        }
        let note;
        try {
            note = await this.noteService.getNoteById(noteId);
        } catch (error) {
            throw new Error(`Getting note: ${noteId}`);
        }
        user.favoriteNotes.push(noteId);
        let newUser;
        try {
            newUser = await user.save();
        } catch (error) {
            throw new Error('Saving the new user');
        }
        return newUser;
    }
}
