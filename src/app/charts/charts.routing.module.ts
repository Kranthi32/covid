import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../shared/main/main.component';
import { HighchartsComponent } from './highcharts/highcharts.component';

const routes: Routes = [
  {
    path:"", component:MainComponent, children:[
      { path:"", component:HighchartsComponent },
      { path:"maps", component: HighchartsComponent }    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
