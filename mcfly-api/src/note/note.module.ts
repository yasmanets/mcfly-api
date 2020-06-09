import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note } from './schema/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Note', schema: Note},
    ])
  ],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
