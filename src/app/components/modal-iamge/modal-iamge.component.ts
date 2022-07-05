import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-iamge',
  templateUrl: './modal-iamge.component.html',
  styles: [
  ]
})
export class ModalIamgeComponent implements OnInit {
 

  usuario!: Usuario;
  public imagenSubir! : File | null  ;
  public imgTemp:any='';
  constructor(
    public modalIamgenService: ModalImagenService,
    private file: FileUploadService
  ) { }

  ngOnInit(): void {

  }

  cerraModal(){ 
    this.imgTemp = null;
    this.modalIamgenService.cerraModal();
  }


  cambiarImagen(event:any){
    this.imagenSubir = event.target.files[0];
    if(!this.imagenSubir){
       this.imagenSubir = null;
       return
    }

    const reader= new FileReader();
    reader.readAsDataURL( this.imagenSubir );

    reader.onloadend =()=>{ 
      this.imgTemp = reader.result;
    }

  }

  
  subirIamgen( ){
    if(!this.imagenSubir){
      return;
    }

    const uid = this.modalIamgenService.id;
    const tipo = this.modalIamgenService.tipo;

    this.file.actualizaFoto( this.imagenSubir, tipo ,uid || '' )
    .then(datos=> {  
      if(datos.ok){
        Swal.fire('Exito','Imagen actualizada con exito','success');
        this.modalIamgenService.nuevaImagen.emit(datos.nombreArchivo)
        this.cerraModal();
      }else{
        Swal.fire('Error', datos.msg ,'error'); 
      }
    }).catch(err=>{ 
      Swal.fire('Error', 'No se pudoi subir la imagen','error');
    });
  }
}
