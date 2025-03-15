import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/authService';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  
  userForms  = new FormGroup({
    username : new FormControl(''),
    password : new FormControl(''),
  })

  constructor(private authService: AuthService, private router: Router){}

  login(){
    if(
      this.userForms.value.username === 'admin' && this.userForms.value.password === '123'){
      this.authService.login('fake-jwt-token'); // Simulación de autenticación
      this.router.navigate(['/admin']);
    }else{
        alert(' credenciales incorrectos ')
    }
  }


}
