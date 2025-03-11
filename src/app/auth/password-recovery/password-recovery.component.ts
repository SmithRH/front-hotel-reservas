import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  imports: [ReactiveFormsModule],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  handleSubmit() {
    if (this.form.valid) {
      this.authService.recoverPassword(this.form.value).subscribe({
        next: (response) => {
          console.log('Correo de recuperación enviado con éxito:', response.message)
          alert(response.message)
          this.router.navigate(['/main'])
        },
        error: (error) => {
          console.log('Ocurrió un error:', error.error.error)
          alert(error.error.error)
        }
      });
    } else {
      this.markControlAsFormFailed();
    }
  }  

  private markControlAsFormFailed() {
    const control = this.form.controls.email;
    if (control && control.invalid) {
      control.setErrors({ ...control.errors, formFailed: true });
    }
  }
    
}
