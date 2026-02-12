import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import type { CreateUserInput } from './interfaces/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async createUser(input: CreateUserInput): Promise<User> {
    const user = this.repo.create({
      email: input.email,
      passwordHash: input.passwordHash,
    });

    return await this.repo.save(user);
  }
}
