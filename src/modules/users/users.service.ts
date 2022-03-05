import { Roles } from './enums/roles.enum';
import { UserRole } from './../user-roles/entities/user-role.entity';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRole) private userRolesRepository: Repository<UserRole>
  ){}

  async createPlayer(data: CreateUserInput): Promise<User> {
    const player = await this.createUser(data);
    await this.addRole(player.id, Roles.PLAYER);
    return player;
  }

  async createAdmin(data: CreateUserInput): Promise<User> {
    const admin = await this.createUser(data);
    await this.addRole(admin.id, Roles.ADMIN);
    return admin;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if(!user) {
      throw new NotFoundException('User not found.');
    }
    user.roles = await this.loadUserRoles(user.id);
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email }
    });
    if(!user) {
      throw new NotFoundException('User not found.');
    }
    user.roles = await this.loadUserRoles(user.id);
    return user;
  }

  async update(id: number, data: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.update(user.id, { ...data });
    const updatedUser = this.userRepository.create({ ...user, ...data});
    return updatedUser;
  }

  async remove(id: number): Promise<Boolean> {
    const user = await this.findOne(id);
    const deletedUser = await this.userRepository.remove(user);
    if(deletedUser) {
      return true;
    }
    return false;
  }

  private async createUser(data: CreateUserInput): Promise<User> {
    const emailAlreadyExists = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if(emailAlreadyExists){
      throw new UnprocessableEntityException('This email is already registered in the system.');
    }
    const user = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(user);
    if(!savedUser){
      throw new Error('Unable to register the user.');
    }
    return savedUser;
  }

  private async addRole(userId: number, roleId: Roles) {
    const userRoles = this.userRolesRepository.create({
      roleId,
      userId
    });
    await this.userRolesRepository.save(userRoles);
  }

  private async loadUserRoles(userId: number): Promise<UserRole[]> {
    const userRoles = await this.userRolesRepository.find({
      where: { userId },
      relations: ['role'],
    });
    return userRoles;
  }
}
