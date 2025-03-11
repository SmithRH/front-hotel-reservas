import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.group({
    credential: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
    loginMethod: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

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
