import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, pipe, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy  {

  titulo:string='';

  titulosuscription!: Subscription;

  constructor( private router: Router ) {

    this.titulosuscription =this.getdataroutes().subscribe(
      ({title})=>{
        this.titulo = title;
        document.title = `AdminPro - ${title}`
      }
    )


   }
  ngOnDestroy(){
    this.titulosuscription.unsubscribe();
  }
 

   getdataroutes(){
      return this.router.events
      .pipe(
        filter((event:any)  => event instanceof ActivationEnd  ),
        filter( (event:ActivationEnd)=> event.snapshot.firstChild===null ),
        map( (event:ActivationEnd)=> event.snapshot.data ),
      )
      
   }
}
