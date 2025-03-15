import { Routes } from '@angular/router';
import { DashboardAdminComponent } from './componentes/dashboard-admin/dashboard-admin.component';
import { HabitacionesComponent } from './componentes/habitaciones/habitaciones.component';
import { LoginAdminComponent } from './componentes/login-admin/login-admin.component';
import { CalendarComponent } from './componentes/calendar/calendar.component';


const routes: Routes = [

    {path:'login', component:LoginAdminComponent},
    {
        path:'',
        component: DashboardAdminComponent,
        children:[
            {path:'habitaciones', component: HabitacionesComponent},
            {path:'calendario', component:CalendarComponent},
            {path: '', redirectTo: 'habitaciones', pathMatch: 'full' } 
        ]
    },
    {path:'**', redirectTo:'login'}
]; 

export default routes;