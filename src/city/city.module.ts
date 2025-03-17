import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), CacheModule.register({
    ttl: 900000000
  })],
  providers: [CityService],
  controllers: [CityController]
})
export class CityModule { }
