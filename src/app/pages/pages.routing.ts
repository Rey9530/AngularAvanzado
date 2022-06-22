import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes= [
  { 
    path:'dashboard', 
    component: PagesComponent,
    children:[
      { path:'', component: DashboardComponent, data:{  title:'Dashboard'} },
      { path:'grafica1', component: Grafica1Component, data:{  title:'grafica1'}},
      { path:'progress', component: ProgressComponent , data:{  title:'progress'}},  
      { path:'account-setting', component: AccountSettingsComponent , data:{  title:'account-setting'}},  
      { path:'promesas', component: PromesasComponent , data:{  title:'promesas'}},
      { path:'rxjs', component: RxjsComponent , data:{  title:'rxjs'}},  
    ] 
  }, 
]


@NgModule({
  declarations: [],
  imports:[
    RouterModule.forChild(routes)
  ],
  exports: [ 
    RouterModule
  ]
})
export class PagesRoutingModule { }
