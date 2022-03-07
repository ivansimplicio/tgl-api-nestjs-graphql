import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>  
  ){}

  async getMinCartValue(): Promise<number> {
    const CART_ID = 1;
    return (await this.cartRepository.findOneOrFail(CART_ID)).minCartValue;
  }
}