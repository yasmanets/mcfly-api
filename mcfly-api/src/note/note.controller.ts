import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
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
}
