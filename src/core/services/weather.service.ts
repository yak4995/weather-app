import WeatherRepository from '../repositories/weather.repository';
import WeatherGateway from '../gateways/weather.gateway';
import Weather from '../entities/weather.entity';
import City from '../entities/city.entity';
import CityService from '../services/city.service';
import { CacheService } from './cache.service';

export default class WeatherService {
  constructor(
    private readonly weatherCacheService: CacheService<Weather>,
    private readonly weatherRepository: WeatherRepository,
    private readonly weatherGateway: WeatherGateway,
    private readonly cityService: CityService,
  ) {}

  async getCurrentWeatherByCity(cityName: string): Promise<Weather> {
    const date = new Date();
    // TODO: in future we need to transfer logic below to cache service for do work with cache more transparent
    const city: City = await this.cityService.insertIfNotExists(cityName);
    const cacheValue: Weather = await this.weatherCacheService.get({ city, date });
    if (cacheValue) {
      return cacheValue;
    } else {
      const result: Weather = await this.weatherGateway.getCurrentWeatherByCity(
        cityName,
      );
      await this.weatherCacheService.set({ city, date }, result);
      return result;
    }
  }

  persistCurrentWeather(): Promise<Weather[]> {
    // TODO: in future we need to check existing values for today in data storage!
    return this.cityService
      .getAll()
      .then(
        (cities: City[]): Promise<Weather[]> =>
          Promise.all(
            cities.map(
              (city: City): Promise<Weather> =>
                this.weatherGateway.getCurrentWeatherByCity(city.name),
            ),
          ),
      )
      .then(
        (weatherRecords: Weather[]): Promise<Weather[]> => 
          Promise.all(
            weatherRecords.map(
              (weatherRecord: Weather): Promise<Weather> =>
                this.weatherRepository.insert(weatherRecord),
            ),
          ),
      );
  }

  getCurrentWeatherByGeoPosition(lon: number, lat: number): Promise<Weather> {
    // TODO: in future we can improve cacheService for storage data by specific keys like geo position
    return this.weatherGateway.getCurrentWeatherByGeoPosition(lon, lat);
  }

  paginateWeatherHistoryByCity(
    city: City,
  ): Promise<Weather[]> {
    // TODO: now we don`t cache it, because every day we need to update cache for new list, but in the future...
    return this.weatherRepository.getByConditions({city});
  }
}
