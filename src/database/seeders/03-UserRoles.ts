import { UserRole } from './../../modules/user-roles/entities/user-role.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class SeedUserRoles implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserRole)
      .values([
        {
          userId: 1,
          roleId: 1
        },
        {
          userId: 2,
          roleId: 2
        },
      ])
      .execute()
  }
}