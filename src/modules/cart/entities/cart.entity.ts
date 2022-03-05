import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;
    
  @Column({ nullable: false })
  minCartValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}