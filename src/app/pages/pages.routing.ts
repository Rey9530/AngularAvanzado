import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes= [
  {
    path:'dashboard', 
    component: PagesComponent,
    canActivate:[AuthGuard],
    children:[
      { path:'', component: DashboardComponent, data:{  title:'Dashboard'} },
      { path:'grafica1', component: Grafica1Component, data:{  title:'Graficas 1'}},
      { path:'progress', component: ProgressComponent , data:{  title:'Progress'}},  
      { path:'account-setting', component: AccountSettingsComponent , data:{  title:'Account Setting'}},  
      { path:'promesas', component: PromesasComponent , data:{  title:'Promesas'}},
      { path:'rxjs', component: RxjsComponent , data:{  title:'RXJS'}},  
      { path:'perfil', component: PerfilComponent , data:{  title:'Perfil'}},  

      //
      { path:'usuarios', component: UsuariosComponent , data:{  title:'Usuarios Mantenimiento'}},  
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
