import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';

@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService
    ) { }

    @UsePipes(ValidationPipe)
    @Post('/:userId')
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @Param('userId') userId: number
    ): Promise<AddressEntity> {
        console.log(createAddressDto);

        return this.addressService.createAddress(createAddressDto, userId)
    }

}
