import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(data: RegisterDTO): Promise<any> {
    // Check if user exists
    const userExists = await this.prisma.resident.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      return { code: 0, msg: 'User already exists' };
    }

    // Hash password
    const hashedPassword = await this.hashData(data.password);
    const newUser = await this.prisma.resident.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.myRole,
    );
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async login(data: LoginDTO) {
    // Check if user exists
    const user = await this.prisma.resident.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      return {
        code: 0,
        msg: 'User does not exist',
      };
    }

    const passwordMatches = await verify(user.password, data.password);
    if (!passwordMatches) {
      return {
        code: 0,
        msg: 'Password is incorrect',
      };
    }

    const tokens = await this.getTokens(user.id, user.email, user.myRole);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      code: 1,
      msg: 'Success',
      data: tokens,
    };
  }

  async logout(userId: string) {
    return this.prisma.resident.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    try {
      const user = await this.prisma.resident.findUnique({
        where: { id: userId },
      });
      if (!user || !user.refreshToken) {
        return {
          code: 0,
          msg: 'Access Denied',
        };
      }

      const refreshTokenMatches = await verify(user.refreshToken, refreshToken);
      if (!refreshTokenMatches) {
        return {
          code: 0,
          msg: 'Access Denied',
        };
      }

      const tokens = await this.getTokens(user.id, user.email, user.myRole);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        code: 1,
        msg: 'Success',
        data: tokens,
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Refresh tokens failed: ' + JSON.stringify(error),
      };
    }
  }

  async hashData(data: string): Promise<string> {
    try {
      return await hash(data);
    } catch (error) {
      // Handle or rethrow properly
      throw new Error('Hashing failed: ' + JSON.stringify(error));
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.prisma.resident.update({
      where: { id: userId },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async getTokens(userId: string, email: string, role: string) {
    try {
      const payload = {
        sub: userId,
        email,
        role,
      };

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRESIN'),
        }),
        this.jwtService.signAsync(payload, {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRESIN'),
        }),
      ]);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Get tokens failed: ' + JSON.stringify(error),
      );
    }
  }
}
