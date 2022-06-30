import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForms } from '../interface/login-form';
import { RegisterForms } from '../interface/refister-form';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
const google_client = environment.google_client;

declare const google:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario!:Usuario;
  constructor( private http: HttpClient,private router: Router ) { }

  get token(){
    return localStorage.getItem('token') || '';
  }
  
  get uid(){
    return this.usuario.uid || '';
  }

  crearUsuario( formData:RegisterForms ){ 
    return this.http.post(`${base_url}/usuarios`,formData)
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      })
    );
  }

  actualizarUsuario( data:{ email:string, nombre:string, role:string } ){
    
    data = {
      ...data, 
      role: this.usuario.role || ''
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers:{
        'x-token':this.token
      }
    });
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
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map((resp:any)=>{ 
        this.usuario = new Usuario( 
          resp.usuario.nombre,
          resp.usuario.email,
          '',
          resp.usuario.img,
          resp.usuario.google,
          resp.usuario.role,
          resp.usuario.uid,
        ); 
        localStorage.setItem('token',resp.token);
        return true;
      }),
      catchError( error=> of(false) )
    ) 
  }

  logaut(){ 
    google.accounts.id.initialize({
      client_id: google_client,
      callback: console.log
    });
    localStorage.removeItem('token')
    google.accounts.id.revoke(this.usuario.email, (done:any) =>{
      this.router.navigateByUrl('/login');
    });
  }
}
