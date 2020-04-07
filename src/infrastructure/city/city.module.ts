import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from './schemas/city.schema';
import { CityController } from './city.controller';
import { CityImplService } from './services/cityImpl.service';
import { CityImplRepository } from './repositories/cityImpl.repository';
import { CityCacheImplService } from './services/cityCacheImpl.service';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'City', schema: CitySchema },
      ]),
    ],
    providers: [
      {
        provide: 'CityRepository',
        useClass: CityImplRepository,
      },
      {
        provide: 'CityCache',
        useClass: CityCacheImplService,
      },
      CityImplService,
    ],
    controllers: [CityController],
})
export class CityModule {}