import { Controller, Get, Param, Post, BadRequestException } from "@nestjs/common";
import { WeatherImplService } from "./services/weatherImpl.service";
import Weather from "../../core/entities/weather.entity";
import { CityImplRepository } from "../city/repositories/cityImpl.repository";
import City from "../../core/entities/city.entity";

@Controller('weather')
export class WeatherController {
  constructor (
    private readonly weatherService: WeatherImplService,
    private readonly cityRepository: CityImplRepository,
  ) {}

  @Get('/current/byCity/:city')
  getCurrentWeatherByCity(@Param('city') cityName: string): Promise<Weather> {
    return this.weatherService.getCurrentWeatherByCity(cityName);
  }

  @Get('/current/byCoords/:lon/:lat')
  getCurrentWeatherByGeoPosition(@Param('lon') lon: number, @Param('lat') lat: number): Promise<Weather> {
    return this.weatherService.getCurrentWeatherByGeoPosition(lon, lat);
  }

  @Get('/:city')
  async paginateWeatherHistoryByCity(@Param('city') cityName: string): Promise<Weather[]> {
    const cities: City[] = await this.cityRepository.getByConditions({name: cityName});
    if (cities.length === 0) {
        throw new BadRequestException('This city has not been found in history');
    }
    return this.weatherService.paginateWeatherHistoryByCity(cities[0]);
  }

  @Post('/')
  persistCurrentWeather(): Promise<Weather[]> {
    return this.weatherService.persistCurrentWeather();
  }
}