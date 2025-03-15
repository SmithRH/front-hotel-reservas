import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  standalone: true, // Asegúrate de que el componente sea standalone
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(){
    console.log('sidebarComponente se cargo correctamente')
  }
}
