import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//terceros
import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ModalIamgeComponent } from './modal-iamge/modal-iamge.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalIamgeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    ModalIamgeComponent
  ]
})
export class ComponentsModule { }
