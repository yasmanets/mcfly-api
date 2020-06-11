import { Controller, Post, Body, Res, HttpStatus, Get, Param } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDTO } from './dto/note.dto';

@Controller('note')
export class NoteController {

    constructor(
        private noteService: NoteService
    ) {}

    @Post('/')
    async createNote(@Body() note: NoteDTO, @Res() res) {
        let newNote;
        try {
            newNote = await this.noteService.createNote(note);
        } catch (error) {
            return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({message: `${error}`});
        }
        return res.status(HttpStatus.OK).json({ newNote });
    }

    @Get('/')
    async allNotes(@Res() res) {
        let notes;
        try {
            notes = await this.noteService.getNotes();
        } catch (error) {
            return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ message: `${error}` });
        }
        return res.status(HttpStatus.OK).json({ notes });
    }

    @Get('/:id')
    async noteById(@Res() res, @Param('id') userId) {
        let note;
        try {
            note = await this.noteService.getNoteById(userId);
        } catch (error) {
            return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ message: `${error}`});
        }
        return res.status(HttpStatus.OK).json({ note });
    }
}
