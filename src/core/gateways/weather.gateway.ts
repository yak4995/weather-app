import Weather from '../entities/weather.entity';

export default interface WeatherGateway {
  getCurrentWeatherByCity(cityName: string): Promise<Weather>;
  getCurrentWeatherByGeoPosition(lon: number, lat: number): Promise<Weather>;
}
