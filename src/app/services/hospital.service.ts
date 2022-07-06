import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital, RespHospital } from '../models/hospital.model';
import { ModalImagenService } from './modal-imagen.service';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor(
     private http: HttpClient
     ) { }

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


  cargarHospitales(){ 
    const url = `${ base_url }/hospitales`
    return this.http.get<RespHospital>(url, this.header )
    .pipe(
      map(  (resp: RespHospital ) => resp.hospital )
    )
  }

  
  crearHospitales( nombre:string ){ 
    const url = `${ base_url }/hospitales`
    return this.http.post(url, {nombre} , this.header )
  }

  
  actualizarHospitales( id:string | undefined, nombre:string ){ 
    const url = `${ base_url }/hospitales/${id}`
    return this.http.put<RespHospital>(url, {nombre} , this.header )
  }

  
  deleteHospitales( id:string |undefined ){ 
    const url = `${ base_url }/hospitales/${id}`
    return this.http.delete(url, this.header )
  }


}
