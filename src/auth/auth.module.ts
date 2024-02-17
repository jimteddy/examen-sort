import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [ ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
