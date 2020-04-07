import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './infrastructure/city/city.module';
import { WeatherModule } from './infrastructure/weather/weather.module';
import { ConfigModule } from './infrastructure/config/config.module';
import { ConfigService } from './infrastructure/config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI')
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    CityModule,
    WeatherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
