import { Injectable } from "@nestjs/common";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput;

  constructor(filePath: string) {
    const configExists: boolean = fs.existsSync(filePath);
    this.envConfig = Object.assign(
      {},
      process.env,
      configExists && dotenv.parse(fs.readFileSync(filePath)),
    );
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}