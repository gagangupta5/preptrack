
import { sign } from "crypto";
import { User } from "../model/User";
import { UserService } from "./UserService";
import bcrypt from "bcrypt";
import { JwtService } from "./JwtService";

export class AuthService {
  private userService: UserService;
  private jwtService: JwtService;

  constructor() {
    this.userService = new UserService();
    this.jwtService = new JwtService();
  }

  async signUp(signUpRequest: User): Promise<User | null> {
    const user = await this.userService.findByEmail(signUpRequest.email);

    if (user) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(signUpRequest.password, 10);

    const createdUser = await this.userService.saveUser({
      name: signUpRequest.name,
      email: signUpRequest.email,
      password: hashedPassword,
    });
    return createdUser;
  }

  async signIn(signInRequest: User): Promise<string | null> {
    const user = await this.userService.findByEmail(signInRequest.email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      signInRequest.password,
      user.password
    );

    if (isPasswordValid) {
      return this.jwtService.generateToken(user.email, user.role, user.id);
    }
    return null;
  }
}
