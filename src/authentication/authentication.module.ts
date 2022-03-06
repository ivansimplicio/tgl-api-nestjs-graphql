import { Bet } from './../modules/bets/entities/bet.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersService } from './../modules/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRole } from './../modules/user-roles/entities/user-role.entity';
import { User } from './../modules/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, Bet]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '2d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthenticationResolver, AuthenticationService, UsersService, JwtStrategy],
})
export class AuthenticationModule {}
