import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherSchema } from './schemas/weather.schema';
import { ConfigModule } from '../config/config.module';
import { CityModule } from '../city/city.module';
import { CityImplRepository } from '../city/repositories/cityImpl.repository';
import { WeatherImplService } from './services/weatherImpl.service';
import { CityImplService } from '../city/services/cityImpl.service';
import { WeatherController } from './weather.controller';
import { CitySchema } from '../city/schemas/city.schema';
import { CityCacheImplService } from '../city/services/cityCacheImpl.service';
import { WeatherCacheImplService } from './services/weatherCacheImpl.service';
import { WeatherImplRepository } from './repositories/weatherImpl.repository';
import { HttpWeatherGateway } from './gateways/httpWeather.gateway';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Weather', schema: WeatherSchema },
      { name: 'City', schema: CitySchema },
    ]),
    HttpModule,
    CityModule,
  ],
  providers: [
    CityImplRepository,
    CityImplService,
    WeatherImplService,
    {
      provide: 'CityCache',
      useClass: CityCacheImplService,
    },
    {
      provide: 'WeatherCache',
      useClass: WeatherCacheImplService,
    },
    {
      provide: 'CityRepository',
      useClass: CityImplRepository,
    },
    {
      provide: 'WeatherRepository',
      useClass: WeatherImplRepository,
    },
    {
      provide: 'WeatherGateway',
      useClass: HttpWeatherGateway,
    },
  ],
  controllers: [WeatherController],
})
export class WeatherModule {}