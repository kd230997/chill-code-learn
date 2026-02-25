import { Module } from '@nestjs/common';
import { PlaygroundController } from '../presentation/playground.controller';

import { PrismaPlaygroundRepository } from './prisma/prisma-playground.repository';
import { USER_REPOSITORY } from '../domain/repositories/playground.repository';
import { PrismaModule } from 'src/shared/infrastructure/prisma/prisma.module';

@Module({
  controllers: [PlaygroundController],
  imports: [PrismaModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: PrismaPlaygroundRepository,
    },
  ],
})
export class UserModule {}
