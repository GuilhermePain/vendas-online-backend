import { Body, Controller, Injectable, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnUserDto } from 'src/user/dtos/return.user.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { IReturnLogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<IReturnLogin> {
        return await this.authService.login(loginDto)
    }

}
