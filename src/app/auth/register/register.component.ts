import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form: FormGroup<{
    email: FormControl<string | null>;
    name: FormControl<string | null>;
    surname: FormControl<string | null>;
    password: FormControl<string | null>;
    gender: FormControl<string | null>;
    doc_type: FormControl<string | null>;
    doc_number: FormControl<string | null>;
    phone: FormControl<string | null>;
  }>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      doc_type: ['', Validators.required],
      doc_number: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15), Validators.pattern(/^\d+$/)]]
    });

    this.setupDynamicDocValidation();
  }

  private setupDynamicDocValidation(): void {
    this.form.get('doc_type')?.valueChanges.subscribe((docType) => {
      const docNumberControl = this.form.get('doc_number');

      if (docNumberControl) {
        // Se limpian las validaciones previas
        docNumberControl.clearValidators();

        // Se crean nuevas validaciones por cada tipo de documento
        if (docType === 'dni') {
          docNumberControl.setValidators([Validators.required, Validators.pattern(/^\d{8}$/)]);
        } else if (docType === 'carne_extranjeria') {
          docNumberControl.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]);
        } 

        // Forzar la re-evaluación de validaciones
        docNumberControl.updateValueAndValidity();
      }
    });
  }

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
