import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  
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
  

  
  buscar( tipo:'usuarios'|'medicos'|'hospitales', termino:string=''){
    //localhost:3005/api/usuarios?desde=0
    const url = `${ base_url }/busqueda/coleccion/${tipo}/${termino}`
    return this.http.get<any[]>(url, this.header )
    .pipe(
      map( (resp:any) => {
        switch(tipo){
          case 'usuarios':
            return this.transformasUsuario(resp.data);
          default:
            return [];
        }

      })
    )
  }


  private transformasUsuario( datos:any[] ) : Usuario[] { 
    return datos.map( 
      user => new Usuario(user.nombre, user.email,'',user.img,user.google,user.role,user.uid)
    )
  }
}
