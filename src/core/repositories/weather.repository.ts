import BaseRepository, { Criteria } from './base.repository';
import Weather from '../entities/weather.entity';

export default interface WeatherRepository extends BaseRepository<Weather> {
  insert(criteria: Criteria<Weather>): Promise<Weather>;
}
