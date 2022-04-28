import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsRoutingModule } from './charts.routing.module';
import { HighchartsComponent } from './highcharts/highcharts.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [HighchartsComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    HighchartsChartModule
  ]
})
export class ChartsModule { }
