import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { User } from '../domain/user';

@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
}
