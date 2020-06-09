import { Note } from 'src/note/interface/note.interface';
import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
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
        console.log(note);
        try {
            newNote = await this.noteService.createNote(note);
        } catch (error) {
            return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({message: `${error}`});
        }
        return res.status(HttpStatus.OK).json({ newNote });
    }

    @Get('/')
    async allUsers(@Res() res) {
        let notes;
        try {
            notes = await this.noteService.getNotes();
        } catch (error) {
            return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ message: `${error}` });
        }
        return res.status(HttpStatus.OK).json({ notes });
    }


}
