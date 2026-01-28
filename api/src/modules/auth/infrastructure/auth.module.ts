import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../../user/infrastructure/user.module';
import { AuthService } from '../application/auth.service';
import { AuthController } from '../presentation/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { USER_REPOSITORY } from '../../user/domain/repositories/user.repository';
import { PrismaUserRepository } from '../../user/infrastructure/prisma/prisma-user.repository';
import { PrismaModule } from 'src/shared/infrastructure/prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env?.JWT_SECRET, // Should be in env
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
