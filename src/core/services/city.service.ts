import CityRepository from '../repositories/city.repository';
import City from '../entities/city.entity';
import { CacheService } from './cache.service';

export default class CityService {
  constructor(
    private readonly cityCacheService: CacheService<City>,
    private readonly cityRepository: CityRepository,
  ) {}

  getAll(): Promise<City[]> {
    return this.cityRepository.getAll();
  }

  async insertIfNotExists(name: string): Promise<City> {
    const cachedCity: City | null = await this.cityCacheService.get({ name });
    console.log('cached city:');
    console.log(cachedCity);
    const city: City = cachedCity ?? await this.cityRepository.insertIfNotExists(name);
    if (!cachedCity) {
      await this.cityCacheService.set({name}, city);
    }
    return city;
  }
}
