import { CartService } from './../cart/cart.service';
import { User } from './../users/entities/user.entity';
import { Game } from './../games/entities/game.entity';
import { GamesService } from './../games/games.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException, UnprocessableEntityException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBetInput } from './dto/create-bet.input';
import { Repository } from 'typeorm';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetsService {
  constructor(
    private readonly gamesService: GamesService,
    private readonly cartService: CartService,
    @InjectRepository(Bet) private betRepository: Repository<Bet>
  ){}

  async create(user: User, bets: CreateBetInput[]): Promise<Bet[]> {
    const betsAux: Bet[] = [];
    let cartPrice = 0;
    for (const index in bets) {
      const game = await this.getGameById(+index, bets[index]);
      this.validateBet(game, bets[index], +index);
      const chosenNumbers = this.sort(bets[index].chosenNumbers).join(',');
      const bet = this.betRepository.create({ userId: user.id, gameId: game.id, chosenNumbers });
      betsAux.push(bet);
      cartPrice += game.price;
    }
    const minCartValue = await this.cartService.getMinCartValue();
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

  async findOne(user: User, id: number) {
    const bet = await this.betRepository.findOne({
      where: { id },
      relations: ['game', 'user'],
    });
    if (!bet)
      throw new NotFoundException('Bet not found.');
    if (bet.userId !== user.id)
      throw new UnauthorizedException('Access denied.');
    return bet;
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