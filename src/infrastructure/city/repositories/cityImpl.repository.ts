import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import CityRepository from "../../../core/repositories/city.repository";
import City from "../../../core/entities/city.entity";
import CityModel from "../interfaces/cityModel.interface";
import { Injectable } from "@nestjs/common";
import { Criteria } from "../../../core/repositories/base.repository";

@Injectable()
export class CityImplRepository implements CityRepository {
  constructor(
    @InjectModel('City')
    private readonly cityModel: Model<CityModel>,
  ) {}

  getByConditions(criteria: Criteria<City>): Promise<City[]> {
    return this.cityModel.find(criteria).exec();
  }

  getAll(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async insertIfNotExists(name: string): Promise<City> {
    const city: City = await this.cityModel.findOne({name}).exec();
    if (city) {
        return city;
    } else {
        const createdCity: CityModel = new this.cityModel({name});
        return createdCity.save();
    }
  }
}