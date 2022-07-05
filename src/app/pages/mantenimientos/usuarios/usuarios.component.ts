import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public imgSubs!:Subscription;
  usuarios:Usuario[]=[];
  total:number=0;
  desde:number=0;
  cargando = true;
  constructor(
    private userService: UsuarioService,
    private buscar: BusquedasService,
    public modalService: ModalImagenService,
  ) { }
  ngOnDestroy(){ 
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuario(); 
    this.imgSubs =this.modalService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img=>{
      this.cargarUsuario();
    });
  }

  abrirModal(user:Usuario) {
    this.modalService.abrirModal('usuarios',user.uid,user.getImgane);
  }

  cargarUsuario(){ 
    this.cargando =true;
    this.userService.cargarUsuario(this.desde).subscribe(({total,usuario})=>{ 
      this.usuarios = usuario;
      this.total  = total;
      this.cargando =false; 
  });
  }
  cambiarPagina(valor:number){
    this.desde += valor; 
    if(this.desde<0){
    }
    this.cargarUsuario();
  }


  buscarData(termino:string){
    if(termino.length===0){
      this.desde = 0; 
      this.cargarUsuario();
      return;
    }
    this.buscar.buscar('usuarios',termino).subscribe(
      resp=>{
        this.usuarios =resp;
      }
    );
  }

  eliminarUsuario(user:Usuario){ 

    if(user.uid==this.userService.uid){ 
      Swal.fire(
        'Error!',
        'No te puedes eliminar a ti mismo',
        'error'
      )
      return ; 
    }

    Swal.fire({
      title: 'Eliminar Usuario?',
      text: `Esta por eliminar a ${ user.nombre }`,
      icon: 'question',
      showCancelButton: true, 
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) { 
        this.userService.eliminarUsuario(user)
        .subscribe((resp:any)=>{ 
          Swal.fire(
            'Eliminado!',
            resp.msg,
            'success'
          )
        });

        this.cargarUsuario();
      }
    })
  }

  cambiarRole(user:Usuario){
    this.userService.guardarUsuario( user )
    .subscribe(resp=>{
      console.log(resp)
    });
  }

}
