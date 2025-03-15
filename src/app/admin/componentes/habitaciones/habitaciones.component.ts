import { Component } from '@angular/core';
import { HabitacionService } from '../../services/habitacion.service';
import { inject} from '@angular/core';
import { Habitacion} from '../../interfaces/habitaciones';
import { HabitacionesDetailsComponent } from '../habitaciones-details/habitaciones-details.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-habitaciones',
  imports: [HabitacionesDetailsComponent, CommonModule ],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent {

  habitaciones: Habitacion[]=[];

  habitacionService:  HabitacionService = inject(HabitacionService); // una forma de injectar 




  constructor() {
    this.habitacionService.getHabitaciones().subscribe({
      next:(response)=>{
        this.habitaciones = response.habitaciones
        console.log(response.habitaciones)
      },
      error:(error)=>{
        console.error('Error al obtener habitaciones', error);
      }
    })
  }

}

