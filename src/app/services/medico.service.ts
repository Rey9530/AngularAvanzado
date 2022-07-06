import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico, RespMedico } from '../models/medico.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private http: HttpClient) { }


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

    cargarMedicos(){ 
      const url = `${ base_url }/medico`
      return this.http.get<RespMedico>(url, this.header )
      .pipe(
        map(  (resp: RespMedico ) => resp.medico )
      )
    }

    
  
  crearMedico( medico:Medico ){ 
    const url = `${ base_url }/hospitales`
    return this.http.post(url, medico , this.header )
  }

  
  actualizarMedico( medico:Medico  ){ 
    const url = `${ base_url }/hospitales/${medico._id}`
    return this.http.put<RespMedico>(url, medico , this.header )
  }

  
  deleteMedico( medico:Medico ){ 
    const url = `${ base_url }/hospitales/${medico._id}`
    return this.http.delete(url, this.header )
  }


}
