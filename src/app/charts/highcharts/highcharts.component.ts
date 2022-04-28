import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CovidCoreService } from 'src/app/services/covid-core.service';
import Highchartss from "highcharts/highmaps";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";


@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent implements OnInit {
  countryList: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: "Average Temprature"
    },
    xAxis: {
      title: {
        text: 'Tokyo'
      },
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: "Temprature"
      }
    },
    series: [{
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 24.4, 19.3, 16.0, 18.4, 17.9],
      type: 'spline'
    }]
  }
  overallList: any;
  gaugeData : any;
  
  constructor(private covidservice : CovidCoreService) {
    
   }

  ngOnInit(): void {
    this.covidservice.getCountrsList().subscribe((data : any) => {
      this.countryList = data;
    })

    this.covidservice.overallList().subscribe((data : any) => {
      this.overallList = data;
    })

    setTimeout(() => {
    //  this.createChartGauge();
      this.createChartColumn();
      this.columnCharts();
      this.worldMap();
    }, 1500);
  }

  private columnCharts() : void {
    const data: any[] = [];

    for (let i = 0; i < 10; i++) {
      data.push({
        name: this.countryList[i].country,
        y: this.countryList[i].cases
      });
    }
    const chart = Highcharts.chart('column charts' as any, {
      chart: {
        type: 'spline',
      },
      title: {
        text: 'CountryWise Report Column Chart',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        title: undefined,
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Country: {point.key}</div>`,
        pointFormat: `<div>Cases: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Cases',
        data,
      }],
    } as any);
    let i = 11;
    setInterval(() => {
      chart.series[0].addPoint({
        name: this.countryList[i].country,
        y: this.countryList[i].cases,
      }, true, true);
      i++
    }, 1500);
  }

  private createChartGauge(): void {
    console.log(this.overallList);
    this.gaugeData = this.overallList.active
    const chart = Highcharts.chart('chart-gauge', {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: 'Gauge Chart',
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '85%'],
        size: '160%',
        background: {
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: this.overallList.population,
        stops: [
          [0.1, '#55BF3B'], 
          [0.5, '#DDDF0D'], 
          [0.9, '#DF5353'], 
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
      series: [{
        name: null,
        data: [this.gaugeData],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span></div>',
        },
      }],
    } as any);
    var gauge : any;
  //   for (let key in this.overallList) {
  //     setTimeout(() => {
  //       if (this.overallList.hasOwnProperty(key)) {
  //         gauge = this.overallList[key]
  //     }
  //     }, 2800);
      
  // }

  var keys = Object.keys(this.overallList);
var index = 0;

var interval = setInterval(() => {
    console.log(keys[index] + " - " + this.overallList[keys[index]]);
    gauge = this.overallList[keys[index]];
    index++;
    if(index == keys.length) {
        clearInterval(interval);
    }
}, 2700);
console.log(gauge);
    setInterval(() => {
      chart.series[0].points[0].update(gauge);
    }, 3000);
  }

  private createChartColumn(): void {
    let date = new Date();
    const data: any[] = [];

    for (let i = 0; i < 10; i++) {
      date.setDate(new Date().getDate() + i);
      data.push({
        name: this.countryList[i].country,
        y: this.countryList[i].cases
      });
    }

    const chart = Highcharts.chart('chart-column' as any, {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Column Chart',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        title: undefined,
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Country: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Cases',
        data,
      }],
    } as any);
    let i = 11;
    setInterval(() => {
      date.setDate(date.getDate() + 1);
      chart.series[0].addPoint({
        name: this.countryList[i].country,
        y: this.countryList[i].cases,
      }, true, true);
      i++
    }, 1500);
  }

  private worldMap() : void {
    const chart = Highchartss.chart('world-map', {
    chart: {
      map: worldMap
    },
    title: {
      text: "Highmaps basic demo"
    },
    subtitle: {
      text:
        'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World, Miller projection, medium resolution</a>'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    legend: {
      enabled: true
    },
    colorAxis: {
      min: 0
    },
    series: [
      {
        type: "map",
        name: "Random data",
        states: {
          hover: {
            color: "#BADA55"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        data: [
          ["fo", 0],
          ["um", 1],
          ["us", 2],
          ["jp", 3],
          ["sc", 4],
          ["in", 5],
          ["fr", 6],
          ["fm", 7],
          ["cn", 8],
          ["pt", 9],
          ["sw", 10],
          ["sh", 11],
          ["br", 12],
          ["ki", 13],
          ["ph", 14],
          ["mx", 15],
          ["es", 16],
          ["bu", 17],
          ["mv", 18],
          ["sp", 19],
          ["gb", 20],
          ["gr", 21],
          ["as", 22],
          ["dk", 23],
          ["gl", 24],
          ["gu", 25],
          ["mp", 26],
          ["pr", 27],
          ["vi", 28],
          ["ca", 29],
          ["st", 30],
          ["cv", 31],
          ["dm", 32],
          ["nl", 33],
          ["jm", 34],
          ["ws", 35],
          ["om", 36],
          ["vc", 37],
          ["tr", 38],
          ["bd", 39],
          ["lc", 40],
          ["nr", 41],
          ["no", 42],
          ["kn", 43],
          ["bh", 44],
          ["to", 45],
          ["fi", 46],
          ["id", 47],
          ["mu", 48],
          ["se", 49],
          ["tt", 50],
          ["my", 51],
          ["pa", 52],
          ["pw", 53],
          ["tv", 54],
          ["mh", 55],
          ["cl", 56],
          ["th", 57],
          ["gd", 58],
          ["ee", 59],
          ["ag", 60],
          ["tw", 61],
          ["bb", 62],
          ["it", 63],
          ["mt", 64],
          ["vu", 65],
          ["sg", 66],
          ["cy", 67],
          ["lk", 68],
          ["km", 69],
          ["fj", 70],
          ["ru", 71],
          ["va", 72],
          ["sm", 73],
          ["kz", 74],
          ["az", 75],
          ["tj", 76],
          ["ls", 77],
          ["uz", 78],
          ["ma", 79],
          ["co", 80],
          ["tl", 81],
          ["tz", 82],
          ["ar", 83],
          ["sa", 84],
          ["pk", 85],
          ["ye", 86],
          ["ae", 87],
          ["ke", 88],
          ["pe", 89],
          ["do", 90],
          ["ht", 91],
          ["pg", 92],
          ["ao", 93],
          ["kh", 94],
          ["vn", 95],
          ["mz", 96],
          ["cr", 97],
          ["bj", 98],
          ["ng", 99],
          ["ir", 100],
          ["sv", 101],
          ["sl", 102],
          ["gw", 103],
          ["hr", 104],
          ["bz", 105],
          ["za", 106],
          ["cf", 107],
          ["sd", 108],
          ["cd", 109],
          ["kw", 110],
          ["de", 111],
          ["be", 112],
          ["ie", 113],
          ["kp", 114],
          ["kr", 115],
          ["gy", 116],
          ["hn", 117],
          ["mm", 118],
          ["ga", 119],
          ["gq", 120],
          ["ni", 121],
          ["lv", 122],
          ["ug", 123],
          ["mw", 124],
          ["am", 125],
          ["sx", 126],
          ["tm", 127],
          ["zm", 128],
          ["nc", 129],
          ["mr", 130],
          ["dz", 131],
          ["lt", 132],
          ["et", 133],
          ["er", 134],
          ["gh", 135],
          ["si", 136],
          ["gt", 137],
          ["ba", 138],
          ["jo", 139],
          ["sy", 140],
          ["mc", 141],
          ["al", 142],
          ["uy", 143],
          ["cnm", 144],
          ["mn", 145],
          ["rw", 146],
          ["so", 147],
          ["bo", 148],
          ["cm", 149],
          ["cg", 150],
          ["eh", 151],
          ["rs", 152],
          ["me", 153],
          ["tg", 154],
          ["la", 155],
          ["af", 156],
          ["ua", 157],
          ["sk", 158],
          ["jk", 159],
          ["bg", 160],
          ["qa", 161],
          ["li", 162],
          ["at", 163],
          ["sz", 164],
          ["hu", 165],
          ["ro", 166],
          ["ne", 167],
          ["lu", 168],
          ["ad", 169],
          ["ci", 170],
          ["lr", 171],
          ["bn", 172],
          ["iq", 173],
          ["ge", 174],
          ["gm", 175],
          ["ch", 176],
          ["td", 177],
          ["kv", 178],
          ["lb", 179],
          ["dj", 180],
          ["bi", 181],
          ["sr", 182],
          ["il", 183],
          ["ml", 184],
          ["sn", 185],
          ["gn", 186],
          ["zw", 187],
          ["pl", 188],
          ["mk", 189],
          ["py", 190],
          ["by", 191],
          ["cz", 192],
          ["bf", 193],
          ["na", 194],
          ["ly", 195],
          ["tn", 196],
          ["bt", 197],
          ["md", 198],
          ["ss", 199],
          ["bw", 200],
          ["bs", 201],
          ["nz", 202],
          ["cu", 203],
          ["ec", 204],
          ["au", 205],
          ["ve", 206],
          ["sb", 207],
          ["mg", 208],
          ["is", 209],
          ["eg", 210],
          ["kg", 211],
          ["np", 212]
        ]
      }
    ]
  } as any);
  }

}
