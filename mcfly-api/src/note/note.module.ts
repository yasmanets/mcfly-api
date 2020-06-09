import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note } from './schema/note.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Note', schema: Note},
    ]),
  ],
  controllers: [NoteController],
  providers: [
    NoteService,
  ],
  exports: [
    NoteService,
  ]
})
export class NoteModule {}
