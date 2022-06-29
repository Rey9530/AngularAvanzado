import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForms } from '../interface/login-form';
import { RegisterForms } from '../interface/refister-form';

const base_url = environment.base_url;
const google_client = environment.google_client;

declare const google:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,private router: Router ) { }


  crearUsuario( formData:RegisterForms ){
    console.log('Creando usuario') 
    return this.http.post(`${base_url}/usuarios`,formData)
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      })
    );
  }

  
  login( formData:LoginForms ){ 
    return this.http.post(`${base_url}/login`,formData)
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      })
    )
  }
  
  loginGoogle( token:string ){ 
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap((resp:any)=>{ 
        localStorage.setItem('token',resp.token)
      })
    )
  }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';


    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any)=>{ 
        localStorage.setItem('token',resp.token)
      }),
      map( resp=>true ),
      catchError( error=> of(false) )
    ) 
  }

  logaut(){ 
    google.accounts.id.initialize({
      client_id: google_client,
      callback: console.log
    });
    localStorage.removeItem('token')
    google.accounts.id.revoke('thebestalpha2.3@gmail.com', (done:any) =>{
      this.router.navigateByUrl('/login');
    });
  }
}
