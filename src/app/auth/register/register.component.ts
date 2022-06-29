import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service'; 
import swal from 'sweetalert2'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:[ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSubmit = false;

  public registerForm:FormGroup = this.fb.group({
    nombre:['Reynaldo', [Validators.required ]],
    email:['demo@demo.com', [Validators.required, Validators.email ]],
    password:['123456', [Validators.required ]],
    password2:['123456', [Validators.required ]],
    terminos:[false, [Validators.required ]],
  },{
    validators: this.passwordIguales('password','password2')
  });

  constructor(private fb: FormBuilder,private serviceUsuario:UsuarioService,private router: Router) { }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formSubmit = true;  
    if(this.registerForm.valid && this.registerForm.get('terminos')?.value){
      this.serviceUsuario.crearUsuario(this.registerForm.value)
      .subscribe( resp => { 
        this.router.navigateByUrl('/')
      }, (err) =>{
        swal.fire( 'Error', err.error.msg,'error' )
      }  )
    }else{
      console.log('No Posteando Formulario');
    }
  }


  campoNoValidado( campo:string ):boolean{
    return (this.registerForm.get(campo)?.invalid && this.formSubmit) ? true : false;
  }

  aceptarTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmit;
  }

  validarContrasenas(){ 
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if(pass1!==pass2 && this.formSubmit){
      return true;
    }else{
      return false;
    }
  }
  

  passwordIguales(pass1:string,pass2:string){ 
    return ( formGroup:FormGroup )=>{
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control?.value===pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIfual:true});
      }
    }
    
  }

}
