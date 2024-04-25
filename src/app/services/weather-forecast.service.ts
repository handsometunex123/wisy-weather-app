import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeoJSON } from '../models/forecast-api.response.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  private apiBaseUrl = environment.baseUrl;
  private coordinates = '31,80'

  constructor(private http: HttpClient) { 

  }

  /**
   * 
   * @param weatherId the current weather Id e.g TOP, LWX
   * @returns an Observable of GeoJSON
   */
  public getTemperatureForeCastById(weatherId: string): Observable<GeoJSON> {
    return this.http.get<GeoJSON>(`${this.apiBaseUrl}/${weatherId}/${this.coordinates}/forecast`)
  }
}
