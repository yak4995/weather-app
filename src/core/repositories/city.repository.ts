import BaseRepository from './base.repository';
import City from '../entities/city.entity';

export default interface CityRepository extends BaseRepository<City> {
  getAll(): Promise<City[]>;
  insertIfNotExists(name: string): Promise<City>;
}
