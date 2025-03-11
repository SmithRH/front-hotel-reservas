import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-register-verification',
  imports: [],
  templateUrl: './register-verification.component.html',
  styleUrl: './register-verification.component.css'
})
export class RegisterVerificationComponent implements OnInit {

  // Solo para iniciar dependencias (inyección de dependencias)
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        const verificationData = { 
          token: params["token"], 
          userId: params["id"] 
        };
        return this.authService.verifyRegister(verificationData);
      })
    ).subscribe({
      next: (response) => {
        console.log('Verificación exitosa:', response);
        alert(response.message);
        this.router.navigate(['/login']);
      },

      error: (error) => {
        console.error('Error en la verificación:', error.error.error);
        alert(error.error.error);
      }
    });
  }
}
