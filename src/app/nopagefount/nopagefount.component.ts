import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefount',
  templateUrl: './nopagefount.component.html',
  styleUrls:['./nopagefount.component.css']
})
export class NopagefountComponent   {
 

  years = new Date().getFullYear();

}
