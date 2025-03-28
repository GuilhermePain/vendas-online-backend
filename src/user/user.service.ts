import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

        const user = await this.getUserByEmail(createUserDto.email).catch(() => undefined)

        if (user) {
            throw new BadRequestException('Email registered in system.')
        }

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

    async getUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new NotFoundException('UserId not found.')
        }

        return user

    }

    async getUserByIdUsingReferences(userId: number): Promise<UserEntity> {

        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                addresses: {
                    city: {
                        state: true
                    }
                }
            }
        })

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        })

        if (!user) {
            throw new NotFoundException('Email not found.')
        }

        return user;
    }

}
