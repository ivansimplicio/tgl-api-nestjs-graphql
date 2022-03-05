import { UserRole } from './../../user-roles/entities/user-role.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;
    
  @Column({ nullable: false, unique: true })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => UserRole)
  @OneToMany(() => UserRole, () => UserRole)
  users: UserRole[];
}
