import { Injectable, Inject } from "@nestjs/common";
import WeatherService from "../../../core/services/weather.service";
import WeatherRepository from "../../../core/repositories/weather.repository";
import { CacheService } from "../../../core/services/cache.service";
import Weather from "../../../core/entities/weather.entity";
import WeatherGateway from "../../../core/gateways/weather.gateway";
import { CityImplService } from "infrastructure/city/services/cityImpl.service";

@Injectable()
export class WeatherImplService extends WeatherService {
  constructor(
    @Inject('WeatherCache')
    weatherCacheService: CacheService<Weather>,
    @Inject('WeatherRepository')
    weatherRepository: WeatherRepository,
    @Inject('WeatherGateway')
    weatherGateway: WeatherGateway,
    cityService: CityImplService,
  ) {
    super(
      weatherCacheService,
      weatherRepository,
      weatherGateway,
      cityService,
    );
  }
}