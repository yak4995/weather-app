import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import WeatherRepository from "../../../core/repositories/weather.repository";
import { Criteria } from "../../../core/repositories/base.repository";
import Weather from "../../../core/entities/weather.entity";
import WeatherModel from "../interfaces/weatherModel.interface";

@Injectable()
export class WeatherImplRepository implements WeatherRepository {
    constructor (
      @InjectModel('Weather')
      private readonly weatherModel: Model<WeatherModel>,
    ) {}

    insert(criteria: Criteria<Weather>): Promise<Weather> {
      const createdWeather: WeatherModel = new this.weatherModel(criteria);
      return createdWeather.save();
    }

    getByConditions(criteria: Criteria<Weather>): Promise<Weather[]> {
      return this.weatherModel.find(criteria).populate('city').exec();
    }
}