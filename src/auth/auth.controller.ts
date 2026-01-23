import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RolesGuard } from "./common/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "./common/roles.decorator";
import { Role } from "@prisma/client";

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.auth.register(dto);
      return {
        status: 'success',
        message: 'User registered successfully',
        data: user,
      };
    } catch (err) {
      return {
        status: 'error',
        message: err.message || 'Registration failed',
      };
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const result = await this.auth.login(dto);
      return {
        status: 'success',
        message: 'Connexion reussie',
        data: result,
      };
    } catch (err) {
      return {
        status: 'error',
        message: err.message || 'Connexion échoué',
      };
    }
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async adminOnly() {
    try {
      // Ici, si le guard passe, c'est ok
      return {
        status: 'success',
        message: 'Admin access granted',
      };
    } catch (err) {
      return {
        status: 'error',
        message: 'Access denied',
      };
    }
  }
}
