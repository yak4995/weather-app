import { HttpService, Injectable } from "@nestjs/common";
import WeatherGateway from "../../../core/gateways/weather.gateway";
import Weather from "../../../core/entities/weather.entity";
import { ConfigService } from "../../config/config.service";
import { CityImplRepository } from "../../city/repositories/cityImpl.repository";

@Injectable()
export class HttpWeatherGateway implements WeatherGateway {
  constructor (
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly cityRepository: CityImplRepository,
  ) {}

  getCurrentWeatherByCity(cityName: string): Promise<Weather> {
    return this
      .httpService
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.configService.get('WEATHER_API_KEY')}`,
      )
      .toPromise()
      .then(async (result) => ({
        city: (await this.cityRepository.getByConditions({name: cityName}))[0],
        date: new Date(),
        temperature: result.data.main.temp,
      }));
  }

  getCurrentWeatherByGeoPosition(lon: number, lat: number): Promise<Weather> {
    return this
      .httpService
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.configService.get('WEATHER_API_KEY')}`,
      )
      .toPromise()
      .then(async (result) => ({
          city: (await this.cityRepository.getByConditions({name: result.data.name}))[0],
          date: new Date(),
          temperature: result.data.main.temp,
        }));
  }
}