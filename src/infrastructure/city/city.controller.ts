import { Controller, Inject, Get } from "@nestjs/common";
import City from "../../core/entities/city.entity";
import { CityImplService } from "./services/cityImpl.service";

@Controller('city')
export class CityController {
  constructor (
    private readonly cityService: CityImplService,
  ) {}

  @Get('/')
  getAll(): Promise<City[]> {
      return this.cityService.getAll();
  }
}