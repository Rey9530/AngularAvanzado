import { Injectable,EventEmitter } from '@angular/core'; 
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>(); 

  
  public tipo!:'usuarios'|'medicos'|'hospitales';
  public id:string='';
  public img:string='';

  private _ocutalModal:boolean = true;

  get ocutalmodal(){
    return this._ocutalModal;
  }

  
  abrirModal( 
    tipo:'usuarios'|'medicos'|'hospitales', 
    id:string='',
    img:string='X'
   ){ 
    this.tipo= tipo;
    this.id= id; 
    
    if(img.includes('http')){
      this.img= img;
    }else{
      this.img= `${base_url}/uploads/${tipo}/${id}`;
    } 
    this._ocutalModal = false;
  }
  
  cerraModal(){
    this._ocutalModal = true;
  }

  constructor() { }
}
