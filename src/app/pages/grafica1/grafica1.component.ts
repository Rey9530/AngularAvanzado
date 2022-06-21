import { Component } from '@angular/core'; 

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  { 

  public labels1:string[] = ['Descargas 1','Descargas 2','Descargas 3'];
  public backgroundColor:string[] = [ '#9E120E','#FF5800','#FFB414',];
  public data:number[] = [ 350, 450, 100 ];
  

   
}
