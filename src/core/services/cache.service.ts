import { Criteria } from '../repositories/base.repository';

export interface CacheService<T> {
  get(keys: Criteria<T>): Promise<T | null>;
  set(keys: Criteria<T>, value: T): Promise<void>;
}
