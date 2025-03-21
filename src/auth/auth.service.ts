import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { IReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from 'src/user/dtos/return.user.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<IReturnLogin> {
        const user: UserEntity | undefined = await this.userService.getUserByEmail(loginDto.email).catch(() => undefined)

        const isMatch = await bcrypt.compare(loginDto.password, user?.password || '')

        if (!user || !isMatch) {
            throw new NotFoundException('Email or password invalid')
        }

        return {
            access_token: this.jwtService.sign({ ...new LoginPayload(user)}),
            user: new ReturnUserDto(user)
        }

    }

}
