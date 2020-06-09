import { Note } from 'src/note/interface/note.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteDTO } from './dto/note.dto';

@Injectable()
export class NoteService {
    constructor(
        @InjectModel('Note') readonly noteModel: Model<Note>,
        //readonly userService: UserService,
    ) {}

    async createNote(note: NoteDTO): Promise<Note> {
        if (!note.title || !note.body) {
            throw new Error('Title and body are required');
        }
        const newNote = await new this.noteModel(note);
        try {
            await newNote.save();
        } catch (error) {
            throw new Error('Saving the new note');
        }
        return newNote;
    }

    async getNotes(): Promise<Note[]> {
        let notes;
        try {
            notes = await this.noteModel.find();
        } catch (error) {
            throw new Error('Getting all notes');
        }
        return notes;
    }
}
