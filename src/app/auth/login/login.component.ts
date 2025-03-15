import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup<{
    credential: FormControl<string | null>,
    loginMethod: FormControl<string | null>,
    password: FormControl<string | null>
  }>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      credential: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
      loginMethod: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    
    this.setupDynamicLoginValidation();
  }

  private setupDynamicLoginValidation(): void {
    this.form.get('loginMethod')?.valueChanges.subscribe((loginMethod) => {
      const credentialControl = this.form.get('credential');

      if (credentialControl) {
        // Se limpian las validaciones previas
        credentialControl.clearValidators();

        // Se crean nuevas validaciones por cada tipo de método de logeo
        if (loginMethod === 'email') {
          credentialControl.setValidators([Validators.required, Validators.email]);
        } else if (loginMethod === 'dni') {
          credentialControl.setValidators([Validators.required, Validators.pattern(/^\d{8}$/)]);
        } else if (loginMethod === 'carne_extranjeria') {
          credentialControl.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]);
        }  

        // Forzar la re-evaluación de validaciones
        credentialControl.updateValueAndValidity();
      }
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          console.log('Logeo realizado exitosamente:', response)
          alert(response.message)
          this.router.navigate(['/main'])
        },
        error: (error) => {
          console.log('Error en el logeo:', error.error.error)
          alert(error.error.error)
        }
      });
    } else {
      this.markControlsAsFormFailed();
    }
  }

  private markControlsAsFormFailed() {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      if (control && control.invalid) {
        control.setErrors({ ...control.errors, formFailed: true });
      }
    });
  }
}
