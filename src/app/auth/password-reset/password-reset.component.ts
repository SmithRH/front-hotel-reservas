import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  imports: [ReactiveFormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  form = this.fb.group({
    password: ['', [Validators.required]],
    password_repeat: ['', [Validators.required]]
  });

  handleSubmit() {
    if (this.form.get('password')?.value !== this.form.get('password_repeat')?.value) { this.markAsPasswordMismatch(); }

    if (this.form.valid) {
      this.activatedRoute.queryParams.pipe(
        switchMap(params => {
          const passwordData = { 
            token: params["token"], 
            userId: params["id"],
            newPassword: this.form.controls.password.value 
          };
          return this.authService.resetPassword(passwordData);
        })
      ).subscribe({
        next: (response) => {
          console.log('Cambio de contraseña exitoso:', response);
          alert(response.message);
          this.router.navigate(['/login']);
        },
  
        error: (error) => {
          console.error('Error en el cambio de contraseña:', error.error.error);
          alert(error.error.error);
        }
      });       
    } else {
      this.markControlsAsFormFailed();
    }
  }

  resetControl() {
    const control = this.form.get('password_repeat');
    if (control) {
      control.setErrors(null);
    }
  }

  private markAsPasswordMismatch() {
    const control = this.form.get('password_repeat');
    if (control) {
      control.setErrors({ ...control.errors, passwordMismatch: true });
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
