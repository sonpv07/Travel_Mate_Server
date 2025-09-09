// users.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly repo: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repo.findOne({ where: { email } });
  }

  // expose repository methods nếu cần
  getRepository(): Repository<User> {
    return this.repo;
  }
}
