import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/infrastructure/prisma/prisma.module';
import { UserModule } from './modules/user/infrastructure/user.module';
import { AuthModule } from './modules/auth/infrastructure/auth.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
