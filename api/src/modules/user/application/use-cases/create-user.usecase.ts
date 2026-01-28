import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(input: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    return this.userRepo.create({
      ...input,
      password: hashedPassword,
    });
  }
}
