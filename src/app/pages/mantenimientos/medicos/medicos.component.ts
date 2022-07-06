import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public cargando : boolean = true;
  public medicos: Medico[] = [];

  constructor( 
    private serMedicos: MedicoService,
    public modalService: ModalImagenService
    ) {


   }

  ngOnInit(): void {
    this.cargandoMedicos();
  }

  cargandoMedicos(){

    this.cargando = true;
    this.serMedicos.cargarMedicos()
    .subscribe((resp)=>{
      this.medicos = resp;
      this.cargando = false;
    })
  }

  editar_medico(medico:Medico){

    // this.cargando = true;
    // this.serMedicos.cargarMedicos()
    // .subscribe((resp)=>{
    //   this.medicos = resp;
    // });
  }

  eliminar_medico(medico:Medico){ 
    this.serMedicos.deleteMedico(medico)
    .subscribe((resp)=>{
      Swal.fire('Eliminado',medico.nombre,'success')
    })
  }

  abrirModal(medico:Medico) {
    this.modalService.abrirModal('medicos',medico._id,medico.img);
  }

}
