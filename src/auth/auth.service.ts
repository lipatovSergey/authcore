import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import type { RegisterInput } from './interfaces/register.input';
import type { RegisterOutput } from './interfaces/register.output';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  async register(input: RegisterInput): Promise<RegisterOutput> {
    const saltRounds = Number(
      this.config.get<string>('BCRYPT_SALT_ROUNDS', '10'),
    );
    // TODO: add validation of saltRounds

    const passwordHash = await bcrypt.hash(input.password, saltRounds);

    const user = await this.usersService.createUser({
      email: input.email,
      passwordHash,
    });

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
