import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  //@Redirect('/')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log("cocuo");
    
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
