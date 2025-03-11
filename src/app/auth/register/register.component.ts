import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb =  inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
    surname: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
    password: ['', Validators.required],
    gender: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15), Validators.pattern(/^\d+$/)]]
  });

  handleSubmit(): void {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          alert(response.message);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error en el registro:', error.error.error);
          alert(error.error.error);
        }
      });
    } else {
      this.markControlsAsFormFailed();
    }
  }
  
  private markControlsAsFormFailed(): void {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      if (control && control.invalid) {
        control.setErrors({ ...control.errors, formFailed: true });
      }
    });
  }
}
