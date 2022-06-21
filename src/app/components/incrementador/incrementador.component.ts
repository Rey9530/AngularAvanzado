import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso:number = 10;
  @Input() classBtn:string = 'btn btn-primary';
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }


  get getporcentaje(){
    return `${this.progreso}%`
  }

  

  cambiarvalor(valor:number){

    if(this.progreso>=100 && valor>=0){
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    
    if(this.progreso<=0 && valor<0){
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    if(this.progreso>=100 && valor>=0){
      
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
    return this.progreso;
  }

  ngOnInit(): void {
  }

}
