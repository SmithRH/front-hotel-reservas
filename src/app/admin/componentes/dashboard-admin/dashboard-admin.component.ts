import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { HabitacionesComponent } from '../habitaciones/habitaciones.component';

@Component({
  standalone: true,
  selector: 'app-dashboard-admin',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})  
export class DashboardAdminComponent {
  constructor(){
    console.log('DashboardAdminComponent cargado');
  }

}