import { Bet } from './../bets/entities/bet.entity';
import { UserRole } from './../user-roles/entities/user-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, Bet])],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
