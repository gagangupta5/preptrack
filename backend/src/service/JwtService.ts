import jwt from "jsonwebtoken";

export class JwtService {
  constructor() {}

  generateToken = ( email: string, role: string, userId: string ): string => {
    return jwt.sign({ email, role, userId }, "c5d7b40510348e8157294c80e44229599a249af8307ab6d2d39094f4fbbddac4");
  };
}