import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public dataForm!:FormGroup;
  usuario!: Usuario;
  public imagenSubir! : File | null  ;
  public imgTemp:any='';
  constructor( 
      private fb: FormBuilder, 
      private serviceUsuario: UsuarioService,
      private file: FileUploadService   
    ){
    this.usuario = this.serviceUsuario.usuario;
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
    this.file.actualizaFoto( this.imagenSubir, 'usuarios',this.usuario.uid || '' )
    .then(datos=> { 
      console.log(datos); 
      if(datos.ok){
        Swal.fire('Exito','Imagen actualizada con exito','success');
        this.usuario.img = datos.img
      }else{
        Swal.fire('Error', datos.msg ,'error'); 
      }
    }).catch(err=>{ 
      Swal.fire('Error', 'No se pudoi subir la imagen','error');
    });
  }

  ngOnInit(): void {
    
    this.dataForm = this.fb.group({ 
      nombre:[ this.usuario.nombre , [Validators.required ]], 
      email:[this.usuario.email, [Validators.required, Validators.email ]],
    });
  }

  actualizarDatos(){ 
    this.serviceUsuario.actualizarUsuario( this.dataForm.value )
    .subscribe(resp=>{
      const { nombre, email} = this.dataForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email  = email;
      Swal.fire('Exito','Datos ingresados corectamente','success');
    }, (err)=>{ 
      Swal.fire('Error', err.error.msg ,'error');

    })

  }

}