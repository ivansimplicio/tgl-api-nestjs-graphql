import { Bet } from './../../bets/entities/bet.entity';
import { UpdateDateColumn, CreateDateColumn, Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;
 
  @Column({ nullable: false, unique: true })
  type: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  range: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  maxNumber: number;

  @Column({ nullable: false })
  color: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @Field(() => [Bet])
  @OneToMany(() => Bet, (bets) => bets.gameId)
  bets: Bet[];
}