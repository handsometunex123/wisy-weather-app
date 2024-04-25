import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherForecastOptionsIdEnum, WeatherForecastOptionsTextEnum } from 'src/app/enums/forecast-options.enum';
import { WeatherForeCastUrlEnum } from 'src/app/enums/forecast.url.enum';
import { WeatherForeCastOptionsModel } from 'src/app/models/forecast-options.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public weatherForeCastOptions: WeatherForeCastOptionsModel[] = [
    {
      weatherId: WeatherForecastOptionsIdEnum.DistrictOfColumbiaForeCast,
      weatherText: WeatherForecastOptionsTextEnum.DistrictOfColumbiaForeCast
    },
    {
      weatherId: WeatherForecastOptionsIdEnum.KansasForeCast,
      weatherText: WeatherForecastOptionsTextEnum.KansasForeCast
    }
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToWeatherDetails(weatherOption: WeatherForeCastOptionsModel): void {
    this.router.navigate([WeatherForeCastUrlEnum.Weather, weatherOption.weatherId], { state: { weatherOptionName: weatherOption.weatherText } });
  }

}
