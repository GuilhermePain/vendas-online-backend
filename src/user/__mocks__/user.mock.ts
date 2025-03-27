import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type";

export const userEntityMock: UserEntity = {
    cpf: '123123122364',
    createdAt: new Date(),
    email: "email@gmail.com",
    id: 3123123,
    name: "nameMock",
    password: "largePassword",
    phone: "912341234",
    typeUser: UserType.User,
    updatedAt: new Date(),
}