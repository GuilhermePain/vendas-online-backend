import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in getUserByEmail', async () => {
    const user = await service.getUserByEmail(userEntityMock.email);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error in getUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    await expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should return error in getUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    await expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should return user in getUserById', async () => {
    const user = await service.getUserById(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    await expect(service.getUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return error in getUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    await expect(service.getUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingReferences(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('return error if user exist', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError()
  })

  it('return error if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null)

    const user = await service.createUser(createUserMock)

    expect(user).toEqual(userEntityMock)

  })

});
