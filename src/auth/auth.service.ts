import { Injectable } from '@nestjs/common';
import { Maybe, Record, RecordNotFound } from '../domain/record';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<Maybe<any>> {
    const user = await this.usersService.findOne(username);
    if (user.found) {
      if (user.just.password === pass) {
        const { password, ...result } = user.just;
        return new Record(result);
      }
      return new RecordNotFound();
    } else {
      return new RecordNotFound();
    }
  }
}
