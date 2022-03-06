import { User } from './../../modules/users/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcryptjs';

export default class SeedUsers implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'Admin',
          email: 'admin@email.com',
          password: bcrypt.hashSync('senha123', 8)
        },
        {
          name: 'Ivan',
          email: 'ivan@email.com',
          password: bcrypt.hashSync('senha123', 8)
        },
      ])
      .execute()
  }
}