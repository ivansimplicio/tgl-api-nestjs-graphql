import { Cart } from './../../modules/cart/entities/cart.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class SeedCart implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Cart)
      .values([
        { minCartValue: 30 }
      ])
      .execute()
  }
}