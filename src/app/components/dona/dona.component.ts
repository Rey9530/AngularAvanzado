import { AfterContentInit, Component, Input } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js'

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements AfterContentInit {

  @Input() titulo: string = 'Sin Titulo';
  @Input() labels: string[] = [];
  @Input() data:   number[]= [];
  @Input() backgroundColor:string[]= []; 
  constructor(){ 
    console.log(this.data) 
    console.log(this.labels) 
    console.log(this.titulo) 
  }
  ngAfterContentInit() { 
    this.doughnutChartData= {
      labels: this.labels,
      datasets: [
        {
          data: this.data,//[ 350, 450, 100 ],
          backgroundColor:this.backgroundColor,//[ '#9E120E','#FF5800','#FFB414',]
        }
      ], 
    };
  }
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.labels,
    datasets: [
      {
        data: this.data,//[ 350, 450, 100 ],
        backgroundColor:this.backgroundColor,//[ '#9E120E','#FF5800','#FFB414',]
      }
    ], 
  };

}
