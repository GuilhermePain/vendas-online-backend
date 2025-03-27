import { ReturnUserDto } from "../../user/dtos/return.user.dto";

export interface IReturnLogin {
    user: ReturnUserDto;
    access_token: string;
}