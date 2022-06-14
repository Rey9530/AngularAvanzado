import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router'; 
import { AuthRoutingModule } from './auth/auth.routing';
import { NopagefountComponent } from './nopagefount/nopagefount.component'; 
import { PagesRoutingModule } from './pages/pages.routing';


const routes: Routes= [ 
  { path:'**', component: NopagefountComponent},
  { path:'', redirectTo:'git dashboard', pathMatch:'full'},
]


@NgModule({
  declarations: [],
  imports:[
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ 
    RouterModule
  ]
})
export class AppRoutingModule { }
