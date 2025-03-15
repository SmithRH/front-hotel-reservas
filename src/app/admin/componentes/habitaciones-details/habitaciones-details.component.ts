import { Component, Input, input } from '@angular/core';
import { Habitacion } from '../../interfaces/habitaciones';

@Component({
  selector: 'app-habitaciones-details',
  imports: [],
  templateUrl: './habitaciones-details.component.html',
  styleUrl: './habitaciones-details.component.css'
})
export class HabitacionesDetailsComponent {
@Input() habitacion!:Habitacion
}
