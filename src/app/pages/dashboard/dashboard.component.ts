import { Component, OnInit, ViewChild } from '@angular/core';
import { CovidCoreService } from 'src/app/services/covid-core.service';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CountryModel} from '../../modal/table.model'


HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public page = 1;
  public pageSize = 15;
  public countries: Array<CountryModel> = [];
  tableData: any = Array;
  sort: any;
  countryList : any;

  constructor(
    private covidSer: CovidCoreService
  ) {
  }

  ngOnInit(): void {

    this.covidSer.getCountrsList().subscribe(data => {
      this.countryList = data;
      this.countryList.forEach((element : any) => {
        this.countries.push(element)
      })
      console.log(this.countryList)
    })
    setTimeout(() => {
      this.createChartPie();
    }, 2000);
  }

  private createChartPie(): void {
    const data: any[] = [];
    for (let i = 0; i < 5; i++) {
      data.push({
        name: this.countryList[i].country,
        y: this.countryList[i].cases
      });
    }

    const chart = Highcharts.chart('chart-pie', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'County Wise Report',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: `<span class="mb-2"><strong>Country: {point.key}</strong></span><br>`,
        pointFormat: `<span>Confirmed: {point.y}</span>`,
        useHTML: true,
      },
      series: [{
        name: null,
        innerSize: '50%',
        data,
      }],
    } as any);

    let i = 6;
    setInterval(() => {
      chart.series[0].addPoint({
        name: this.countryList[i].country,
        y: this.countryList[i].cases,
      }, true, true);
      i++;
    }, 3000);


  }

}
