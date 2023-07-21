import { UserService } from './user.service';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
