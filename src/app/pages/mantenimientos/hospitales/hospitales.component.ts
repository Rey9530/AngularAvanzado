import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public imgSubs!:Subscription;
  public hospitales:Hospital[]=[];
  public cargando:boolean = true;

  constructor(
    private hosSeri: HospitalService,
    public modalService: ModalImagenService,
    private buscar: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarHospital();
    this.imgSubs =this.modalService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img=>{
      this.cargarHospital();
    });
  }

  cargarHospital(){
    this.cargando = true;
    this.hosSeri.cargarHospitales()
    .subscribe((hospitales)=>{ 
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  guardar_camkbios(hospital:Hospital){
    this.hosSeri.actualizarHospitales(hospital._id,hospital.nombre)
    .subscribe(resp=>{
      Swal.fire('Actualizado', hospital.nombre,'success');
    });
  }

  
  eliminar_hospital(hospital:Hospital){
    this.hosSeri.deleteHospitales(hospital._id)
    .subscribe(resp=>{
      Swal.fire('Eliminado', hospital.nombre,'success');
      this.cargarHospital();
    });
  }

  async abrirSwalert()  {
    const {value=''}  = await Swal.fire<string>({
      title:'Crear Hospital',
      input: 'text',
      text:'Ingrese el nombre del hospital',
      inputPlaceholder: 'Nombre Hospital',
      showCancelButton:true,
    })
    if( value?.trim().length>0 ){
      this.hosSeri.crearHospitales(value)
      .subscribe((resp:any)=>{
        this.hospitales.push(resp.hospital)
      })
    }
  }

  abrirModal(hospital:Hospital) {
    this.modalService.abrirModal('hospitales',hospital._id,'hospital.img');
  }

  
  buscarData(termino:string){
    console.log(termino.trim().length)
    if(termino.trim().length==0){ 
      this.hosSeri.cargarHospitales()
      return;
    }
    this.buscar.buscar('hospitales',termino).subscribe(
      (resp:any)=>{
        this.hospitales =resp;
      }
    );
  }
}
