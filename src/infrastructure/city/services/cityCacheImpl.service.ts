import * as md5 from 'md5';
import { Injectable, Scope } from "@nestjs/common";
import { CacheService } from "../../../core/services/cache.service";
import City from "../../../core/entities/city.entity";
import { Criteria } from "../../../core/repositories/base.repository";

// it should exists as one instance on entire app
@Injectable({ scope: Scope.DEFAULT })
export class CityCacheImplService implements CacheService<City> {

  private readonly simpleCacheStorage: {[key: string]: City};

  constructor () {
    this.simpleCacheStorage = {};
  }

  getHash(keys: Criteria<City>): string {
    return md5(keys.name);
  }

  async get(keys: Criteria<City>): Promise<City | null> {
    if (!keys.name) {
      throw new Error('You have not passed city name to city cache service!');
    }
    return this.simpleCacheStorage[this.getHash(keys)] ?? null;
  }

  async set(keys: Criteria<City>, value: City): Promise<void> {
    if (!keys.name) {
      throw new Error('You have not passed city name to city cache service!');
    }
    // for this simple example and like simple hash algorythm (not for passwords) we will use md5
    this.simpleCacheStorage[this.getHash(keys)] = value;
  }
}