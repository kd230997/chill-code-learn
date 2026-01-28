import { Inject, Injectable } from '@nestjs/common';
import {
    USER_REPOSITORY,
    type UserRepository,
} from '../../domain/repositories/user.repository';

@Injectable()
export class FindUsersUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepository,
    ) { }

    execute() {
        return this.userRepo.findAll();
    }
}
