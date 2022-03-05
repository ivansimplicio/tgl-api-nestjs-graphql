import { UserRole } from './../../user-roles/entities/user-role.entity';
import { ObjectType, Field, HideField, ID } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;
 
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  @HideField()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [UserRole])
  @OneToMany(() => UserRole, (userRoles) => userRoles.userId)
  roles: UserRole[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
