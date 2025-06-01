import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  async getProfile(@Request() req: { user: JwtPayload }) {
    const result = await this.usersService.findById(req.user.sub);
    return result;
  }

  @Roles('admin')
  @Get()
  getAllUserData() {
    return this.usersService.findAll();
  }

  @Roles('admin')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return result;
  }
}