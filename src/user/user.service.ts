import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {

        const saltOrRounds = 10;
        const passwordHashed = await bcrypt.hash(createUserDto.password, saltOrRounds);

        console.log('password', passwordHashed)

        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHashed
        })
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }

}
