import { Game } from './../games/entities/game.entity';
import { GamesService } from './../games/games.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { CreateBetInput } from './dto/create-bet.input';
import { Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetsService {
  constructor(
    private readonly gamesService: GamesService,
    @InjectRepository(Bet) private betRepository: Repository<Bet>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>  
  ){}

  async create(bets: CreateBetInput[]): Promise<Bet[]> {
    const USER_ID = 2;
    const betsAux: Bet[] = [];
    let cartPrice = 0;
    for (const index in bets) {
      const game = await this.getGameById(+index, bets[index]);
      this.validateBet(game, bets[index], +index);
      const chosenNumbers = this.sort(bets[index].chosenNumbers).join(',');
      const bet = this.betRepository.create({ userId: USER_ID, gameId: game.id, chosenNumbers });
      betsAux.push(bet);
      cartPrice += game.price;
    }
    const minCartValue = await this.getMinCartValue();
    if (cartPrice < minCartValue) {
      throw new UnprocessableEntityException(
        `The value of your bets must total at least ${minCartValue}, but total only ${cartPrice}.`
      )
    }
    const savedBets = await this.betRepository.save(betsAux);
    if (!savedBets)
      throw new InternalServerErrorException('Unable to register your bets.');
    return savedBets;
  }

  async findAll(): Promise<Bet[]> {
    return await this.betRepository.find();
  }

  async findOne(id: number) {
    const bet = await this.betRepository.findOne({
      where: { id },
      relations: ['game', 'user'],
    });
    if (!bet)
      throw new NotFoundException('Bet not found.');
    return bet;
  }

  private async getMinCartValue(): Promise<number> {
    const CART_ID = 1;
    return (await this.cartRepository.findOneOrFail(CART_ID)).minCartValue;
  }

  private async getGameById(index: number, bet: CreateBetInput): Promise<Game> {
    try{
      return await this.gamesService.findOne(bet.gameId);
    }catch(err){
      throw new UnprocessableEntityException({ message: err.message, index });
    }
  }

  private validateBet(game: Game, bet: CreateBetInput, index: number) {
    const numbers = bet.chosenNumbers;
    const differentValues = numbers.every((value: number, index: number, array: number[]) => array.indexOf(value) === index);
    if(!differentValues){
      throw new UnprocessableEntityException({
        message: 'Bet with repeated numbers.',
        index
      });
    }
    if(numbers.length !== game.maxNumber){
      throw new UnprocessableEntityException({
        message: 'Does not have the amount of numbers required by the game.',
        index
      });
    }
    if (Math.min(...numbers) <= 0 || Math.max(...numbers) > game.range) {
      throw new UnprocessableEntityException({
        message: 'The array has some value outside the range allowed by the game.',
        index
      })
    }
  }

  private sort (numbers: Array<number>): Array<number> {
    return numbers.sort((x, y) => x - y)
  }
}