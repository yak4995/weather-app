import * as md5 from 'md5';
import { Injectable } from "@nestjs/common";
import { CacheService } from "../../../core/services/cache.service";
import Weather from "../../../core/entities/weather.entity";
import { Criteria } from "../../../core/repositories/base.repository";

@Injectable()
export class WeatherCacheImplService implements CacheService<Weather> {

  private readonly simpleCacheStorage: {[key: string]: Weather};

  constructor () {
    this.simpleCacheStorage = {};
  }

  getHash(keys: Criteria<Weather>): string {
    if (!(keys.city && keys.date)) {
        throw new Error('You have not passed date or city name to weather cache service!');
    }
    // by date: Date and city: City
    return md5(`${keys.city.name} ${(keys.date as Date).toDateString()}`);
  }

  async get(keys: Criteria<Weather>): Promise<Weather | null> {
    return this.simpleCacheStorage[this.getHash(keys)] ?? null;
  }

  async set(keys: Criteria<Weather>, value: Weather): Promise<void> {
    // for this simple example and like simple hash algorythm (not for passwords) we will use md5
    this.simpleCacheStorage[this.getHash(keys)] = value;
  }
}