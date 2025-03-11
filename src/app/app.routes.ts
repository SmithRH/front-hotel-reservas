import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterVerificationComponent } from './auth/register-verification/register-verification.component';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';

export const routes: Routes = [
    {
        path: 'main',
        title: 'Main Page',
        component: MainComponent
    },
    {
        path: 'register',
        title: 'Register Page',
        component: RegisterComponent
    },
    {
        path: 'verification',
        title: 'Register Verification Page',
        component: RegisterVerificationComponent
    },
    {
        path: 'password_recovery',
        title: 'Password Recovery Page',
        component: PasswordRecoveryComponent
    },
    {
        path: 'password_reset',
        title: 'Password Reset Page',
        component: PasswordResetComponent
    },
    {
        path: 'login',
        title: 'Login Page',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: 'main'
    }

]
