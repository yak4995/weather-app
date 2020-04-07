import City from "../../../core/entities/city.entity";
import { Document } from 'mongoose';

export default class CityModel extends Document implements City {
  name: string;
}