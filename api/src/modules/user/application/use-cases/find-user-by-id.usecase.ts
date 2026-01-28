import { Inject, Injectable } from '@nestjs/common';
import {
    USER_REPOSITORY,
    type UserRepository,
} from '../../domain/repositories/user.repository';

@Injectable()
export class FindUserByIdUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepository,
    ) { }

    execute(userId: string) {
        return this.userRepo.findById(userId);
    }
}
