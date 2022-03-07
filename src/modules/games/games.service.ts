import { ListGames } from './dto/list-games.output';
import { CartService } from './../cart/cart.service';
import { Bet } from './../bets/entities/bet.entity';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {

  constructor(
    private readonly cartService: CartService,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(Bet) private betRepository: Repository<Bet>
  ){}

  async create(data: CreateGameInput): Promise<Game> {
    await this.typeAlreadyExists(data.type);
    const game = this.gameRepository.create(data);
    const savedGame = await this.gameRepository.save(game);
    if(!savedGame){
      throw new Error('Unable to save game.');
    }
    return savedGame;
  }

  async findAll(): Promise<ListGames> {
    const games = await this.gameRepository.find();
    const minCartValue = await this.cartService.getMinCartValue();
    return { minCartValue, games };
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne(id);
    if(!game) {
      throw new NotFoundException('Game not found.');
    }
    game.bets = await this.loadGameBets(game.id);
    return game;
  }

  async update(id: number, data: UpdateGameInput): Promise<Game> {
    const game = await this.findOne(id);
    if (data.type) {
      await this.typeAlreadyExists(data.type);
    }
    await this.gameRepository.update(game.id, { ...data });
    const updatedGame = this.gameRepository.create({ ...game, ...data});
    return updatedGame;
  }

  async remove(id: number): Promise<boolean> {
    const game = await this.findOne(id);
    const deletedGame = await this.gameRepository.remove(game);
    if(deletedGame) {
      return true;
    }
    return false;
  }

  private async typeAlreadyExists(type: string) {
    const game = await this.gameRepository.findOne({
      where: { type },
    });
    if(game){
      throw new UnprocessableEntityException('This type is already registered in the system.');
    }
  }

  private async loadGameBets(gameId: number): Promise<Bet[]> {
    const gameBets = await this.betRepository.find({
      where: { gameId },
      relations: ['user'],
    });
    return gameBets;
  }
}
