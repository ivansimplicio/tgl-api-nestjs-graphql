import { Game } from './../../games/entities/game.entity';
import { User } from './../../users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('bets')
export class Bet {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;
    
  @Column({ nullable: false })
  chosenNumbers: string;

  @Column({ nullable: false })
  gameId: number;

  @Column({ nullable: false })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, () => User)
  user: User;

  @Field(() => Game)
  @ManyToOne(() => Game, () => Game)
  game: Game;
}