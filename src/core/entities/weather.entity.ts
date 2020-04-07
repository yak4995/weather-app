import City from './city.entity';

export default interface Weather {
  date: Date;
  city: City;
  temperature: number;
}
