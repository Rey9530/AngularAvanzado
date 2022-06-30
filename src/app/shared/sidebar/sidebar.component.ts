import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItem: any[]; 
  usuario!:Usuario ;

  constructor( 
    private sidebarService:SidebarService,
    private serviceUsuario:UsuarioService
     ) { 
    this.menuItem = this.sidebarService.menu;  
    this.usuario =  this.serviceUsuario.usuario;
  }

  ngOnInit(): void {
  }

}
