import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from '../users/users.module';


@Module({
  imports: [JwtModule.register({ global: true }), AdminModule,UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
