import { Module } from '@nestjs/common';
import { UserController } from '../presentation/user.controller';

import { PrismaUserRepository } from './prisma/prisma-user.repository';
import { USER_REPOSITORY } from '../domain/repositories/user.repository';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { FindUsersUseCase } from '../application/use-cases/find-users.usecase';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { PrismaModule } from 'src/shared/infrastructure/prisma/prisma.module';

@Module({
  controllers: [UserController],
  imports: [PrismaModule],
  providers: [
    CreateUserUseCase,
    FindUsersUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
