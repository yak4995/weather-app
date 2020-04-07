import Weather from "../../../core/entities/weather.entity";
import { Document } from 'mongoose';
import CityModel from "../../city/interfaces/cityModel.interface";

export default class WeatherModel extends Document implements Weather {
  date: Date;
  city: CityModel;
  temperature: number;
  name: string;
}