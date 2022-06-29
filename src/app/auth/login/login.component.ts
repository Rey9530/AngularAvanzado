import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';  
const google_client = environment.google_client;

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:[ './login.component.css' ]
})
export class LoginComponent implements  AfterViewInit {

  @ViewChild("buttonDiv") googleBtn!:ElementRef;
  
  public formSubmit = false;

  public dataForm:FormGroup = this.fb.group({ 
    email:[ localStorage.getItem('email') || ''  , [Validators.required, Validators.email ]],
    password:['123456', [Validators.required ]], 
    remenber:[ (localStorage.getItem('email')) ? true : false ], 
  });

  constructor(
      private router: Router ,
      private fb: FormBuilder,
      private serviceUsuario:UsuarioService,
      private ngZone: NgZone, 
    ) { }
  ngAfterViewInit(): void {
    this.googleInit();  
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: google_client ,
      callback: (resp:any) => this.handleCredentialResponse(resp)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any){ 
    this.serviceUsuario.loginGoogle(response.credential)
    .subscribe(resp=>{
      this.ngZone.run(()=>{      
        this.router.navigateByUrl('/')
      })
    },(err) =>{
      swal.fire( 'Error', err.error.msg,'error' )
    })
  } 
  login(){ 
    this.serviceUsuario.login(this.dataForm.value)
    .subscribe(resp=>{ 
      if(this.dataForm.get('remenber')?.value){
        localStorage.setItem('email',this.dataForm.get('email')?.value); 
      }else{
        localStorage.removeItem('email'); 
      }  
      this.router.navigateByUrl('/')
    },(err) =>{
      swal.fire( 'Error', err.error.msg,'error' )
    });
  }


}
