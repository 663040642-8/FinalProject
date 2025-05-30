import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user; // Destructure เพื่อเอา password ออก
      return result;
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email นี้ถูกใช้ไปแล้ว');
    }
    return this.usersService.create({
      email: registerDto.email,
      password: registerDto.password,
    });
  }


  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user.id, email: user.email, role: user.role.name };
    return this.jwtService.sign(payload);
  }
}
