import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { NoteModule } from 'src/note/note.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'User', schema: User},
    ]),
    NoteModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {}
