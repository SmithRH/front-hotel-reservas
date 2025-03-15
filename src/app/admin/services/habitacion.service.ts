import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { habitacionesResponse } from '../interfaces/habitaciones';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  url = "http://localhost:8080/habitaciones/";

  constructor(private http: HttpClient) { }

  getHabitaciones(): Observable<habitacionesResponse>{
    return this.http.get<habitacionesResponse>(this.url)
  }

}
