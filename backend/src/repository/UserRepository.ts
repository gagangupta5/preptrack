import { Repository } from "typeorm";
import { User } from "../model/User";
import { PostgresDataSource } from "../config/Database";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(User);
  }

  async saveuser(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }


}
