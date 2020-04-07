export type Criteria<T> = { [P in keyof T]?: any };

export default interface BaseRepository<T> {
  getByConditions(criteria: Criteria<T>): Promise<T[]>;
}
