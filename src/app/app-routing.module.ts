import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { WeatherForeCastUrlEnum, WeatherForeCastUrlParamEnum } from './enums/forecast.url.enum';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: WeatherForeCastUrlEnum.Home, pathMatch: 'full' },
  { path: WeatherForeCastUrlEnum.Home, component: HomepageComponent},
  { path: `${WeatherForeCastUrlEnum.Weather}/:${WeatherForeCastUrlParamEnum.ID}`, component: WeatherDetailsComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
