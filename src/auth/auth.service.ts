import { Injectable, ConflictException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { hashageService } from "../hashage/hashage.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private bcrypt: hashageService,
    private jwt: JwtService,
  ) {}

  // ------------------- REGISTER -------------------
  async register(
    dto: RegisterDto,
  ): Promise<Omit<{ id: string; email: string; role: string; createdAt: Date }, "password">> {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException("User already exists");

    const hash = await this.bcrypt.hash(dto.password);

    const user = await this.prisma.user.create({
      data: { email: dto.email, password: hash },
    });

    const { password, ...safeUser } = user;
    return safeUser;
  }

  // ------------------- LOGIN -------------------
  async login(dto: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Omit<typeof dto, "password">;
  }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException();

    const valid = await this.bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException();

    // Payload pour les tokens
    const payload = { sub: user.id, role: user.role };

    // Générer l'access token (court)
    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET || "default_secret",
      expiresIn: "15m", // access token court
    });

    // Générer le refresh token (plus long)
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
      expiresIn: "7d", // refresh token long
    });

    const { password, ...safeUser } = user;

    return { accessToken, refreshToken, user: safeUser };
  }

  // ------------------- REFRESH TOKEN -------------------
  async refreshToken(oldToken: string): Promise<{ accessToken: string }> {
    try {
      // Vérifier le refresh token
      const payload = await this.jwt.verifyAsync(oldToken, {
        secret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
      });

      // Générer un nouveau access token
      const accessToken = await this.jwt.signAsync(
        { sub: payload.sub, role: payload.role },
        {
          secret: process.env.JWT_SECRET || "default_secret",
          expiresIn: "15m",
        },
      );

      return { accessToken };
    } catch (err) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
}
