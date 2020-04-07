import { Injectable, Inject } from "@nestjs/common";
import CityService from "../../../core/services/city.service";
import CityRepository from "../../../core/repositories/city.repository";
import { CacheService } from "../../../core/services/cache.service";
import City from "../../../core/entities/city.entity";

@Injectable()
export class CityImplService extends CityService {
    constructor(
      @Inject('CityCache')
      cityCacheService: CacheService<City>,
      @Inject('CityRepository')
      cityRepository: CityRepository,
    ) {
      super(cityCacheService, cityRepository);
    }
}