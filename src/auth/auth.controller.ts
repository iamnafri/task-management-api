import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { AuthCredentialDto } from './dtos/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async me(@GetUser() user: User): Promise<User> {
    return user;
  }
}
