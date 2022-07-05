import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interface/cargar-usuario';
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

  get header(){
    return {
      headers:{
        'x-token':this.token
      }
    };
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

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.header);
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
    return this.http.get(`${base_url}/login/renew`, this.header)
    .pipe(
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

  cargarUsuario(desde:number=0){
    //localhost:3005/api/usuarios?desde=0
    const url = `${ base_url }/usuarios?desde=${desde}`
    return this.http.get<CargarUsuario>(url, this.header )
    .pipe(
      map( resp=>{
        const usuarios = resp.usuario.map( 
          user => new Usuario(user.nombre, user.email,'',user.img,user.google,user.role,user.uid)
        )
        return {
          total:resp.total,
          usuario:usuarios,
        };
      } )
    )
  }


  eliminarUsuario(usuario:Usuario){
    return this.http.delete(`${base_url}/usuarios/${ usuario.uid }`,this.header );
  }

  
  guardarUsuario( usuario:Usuario ){
    
    // data = {
    //   ...data, 
    //   role: this.usuario.role || ''
    // }

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.header);
  } 
}
