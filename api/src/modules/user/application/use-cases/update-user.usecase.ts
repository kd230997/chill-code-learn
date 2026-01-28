import { Inject, Injectable } from '@nestjs/common';
import {
    USER_REPOSITORY,
    type UserRepository,
} from '../../domain/repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepository,
    ) { }

    async execute(userId: string, dto: UpdateUserDto) {
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        return this.userRepo.update(userId, dto);
    }
}

