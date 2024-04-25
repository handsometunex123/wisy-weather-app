import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import {
  Subject,
  catchError,
  delay,
  filter,
  finalize,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {
  WeatherForecastOptionsIdEnum,
  WeatherForecastOptionsTextEnum,
} from 'src/app/enums/forecast-options.enum';
import { WeatherForeCastUrlParamEnum } from 'src/app/enums/forecast.url.enum';
import { GeoJSON, Period, Properties } from 'src/app/models/forecast-api.response.model';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { LineChartComponent } from 'src/app/shared/line-chart/line-chart.component';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('lineChart') public lineChart!: LineChartComponent;
  /**
   * this subject is triggered when the component is destroyed
   */
  private destroy$ = new Subject();
  public labelHeading: string = 'Temperature';
  public startLoader!: boolean;
  public currentWeather!: string;
  public foreCastProperties!: Properties;
  public error: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectRef: ChangeDetectorRef,
    private weatherForeCastService: WeatherForecastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((param) => param.get(WeatherForeCastUrlParamEnum.ID)),
        filter((paramId) => paramId !== null && paramId !== undefined),
        tap((paramId) => {
          this.startLoader = true;
          this.currentWeather = this.getCurrentWeatherName(paramId as WeatherForecastOptionsIdEnum)
        }),
        switchMap((paramId) => {
          return this.weatherForeCastService
            .getTemperatureForeCastById(paramId as string)
            .pipe(
              // delayed the API by 600ms so that the loading functionality can show....
              delay(600),
              catchError((err) => {
                return throwError(err);
              })
            );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (foreCast: GeoJSON) => {
          this.foreCastProperties = foreCast?.properties;
          const periodNames = this.foreCastProperties?.periods?.map(
            (period) => period.name
          );
          const temperatures = this.foreCastProperties?.periods?.map((period) =>
            period.temperature.toString()
          );
          this.startLoader = false;
          this.error = null;
          this.lineChart?.plotLineChart(
            this.labelHeading,
            periodNames,
            temperatures
          );
          this.changeDetectRef.detectChanges();
        },
        error: (err: HttpErrorResponse) => {
          this.startLoader = false;
          this.error = err.error?.detail || err.message;
          this.changeDetectRef.detectChanges();
        }
      });
  }

  /**
   * 
   * @param weatherCode the weather code of a location e.g TOP for Kansas
   * @returns the current weather name of a particular location either from the route history or manual mappings... 
   */
  private getCurrentWeatherName(weatherCode: WeatherForecastOptionsIdEnum): string {
    if (history.state.weatherOptionName) {
      return history.state.weatherOptionName;
    } else {
      switch (weatherCode) {
        case WeatherForecastOptionsIdEnum.DistrictOfColumbiaForeCast:
          return WeatherForecastOptionsTextEnum.DistrictOfColumbiaForeCast;

        case WeatherForecastOptionsIdEnum.KansasForeCast:
          return WeatherForecastOptionsTextEnum.KansasForeCast;
        default:
          return `Forecast - ${weatherCode}`;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
