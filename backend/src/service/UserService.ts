import { User } from "../model/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async saveUser(user: Partial<User>): Promise<User> {
    return this.userRepository.saveUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}