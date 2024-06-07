import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { map, Observable } from 'rxjs';
import { getAuthHeaders } from '../utils/auth-headers.util';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  private apiUrl = environment.wsUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  // Método para crear una nueva orden
  addNewOrder(userId: number, lat: number, lng: number): Observable<any> {
    const headers = getAuthHeaders(this.tokenService);
    const body = { userId, lat, lng };
    return this.http.post(`${this.apiUrl}/orders/new`, body, { headers });
  }
  // Método para obtener todos los choferes
  getAllDrivers(): Observable<any> {
    const url = `${this.apiUrl}/orders/get-choferes`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.get<any>(url, { headers }).pipe(
      map(response => response.data)
    );
  }

}
