import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/return.user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return await this.userService.createUser(createUser)

    }

    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUsers()).map((userEntity) => new ReturnUserDto(userEntity))
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.userService.getUserByIdUsingReferences(userId))
    }
}