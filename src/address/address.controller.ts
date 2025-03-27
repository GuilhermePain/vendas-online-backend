import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type';
import { UserId } from '../decorators/user-id.decorator';

@Roles(UserType.User)
@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService
    ) { }

    @UsePipes(ValidationPipe)
    @Post()
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @UserId() userId: number
    ): Promise<AddressEntity> {
        console.log('UserId: ', userId);
        return this.addressService.createAddress(createAddressDto, userId)
    }

}
