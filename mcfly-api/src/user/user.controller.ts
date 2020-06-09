import { Controller, Post, Res, Body, HttpStatus, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Post('/')
    async createUser(@Body() user: UserDTO, @Res() res) {
        let newUser;
        try {
            newUser = await this.userService.createUser(user);
        } catch (error) {
            return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ message: `${error}` });
        }
        return res.status(HttpStatus.OK).json({ newUser });
    }

    @Get('/')
    async allUsers(@Res() res) {
        let users;
        try {
            users = await this.userService.getUsers();
        } catch (error) {
            return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ message: `${error}` });
        }
        return res.status(HttpStatus.OK).json({ users });
    }
}
