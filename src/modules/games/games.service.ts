import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {

  constructor(@InjectRepository(Game) private gameRepository: Repository<Game>){}

  async create(data: CreateGameInput): Promise<Game> {
    await this.typeAlreadyExists(data.type);
    const game = this.gameRepository.create(data);
    const savedGame = await this.gameRepository.save(game);
    if(!savedGame){
      throw new Error('Unable to save game.');
    }
    return savedGame;
  }

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.find();
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne(id);
    if(!game) {
      throw new NotFoundException('Game not found.');
    }
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
}
