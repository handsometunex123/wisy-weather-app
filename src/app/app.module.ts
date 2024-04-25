import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { RouterModule } from '@angular/router';
import { LineChartModule } from './shared/line-chart/line-chart.module';
import { LoaderModule } from './shared/loader/loader.module';
import { ErrorPageModule } from './shared/error-page/error-page.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WeatherDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    LineChartModule,
    LoaderModule,
    ErrorPageModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
