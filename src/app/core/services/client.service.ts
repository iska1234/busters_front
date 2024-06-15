import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { IClient } from '../models/IClient';
import { Observable } from 'rxjs';
import { getAuthHeaders } from '../utils/auth-headers.util';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = environment.wsUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  registerClient(client: IClient): Observable<any> {
    const headers = getAuthHeaders(this.tokenService);
    return this.http.post(`${this.apiUrl}/client/new`, client, { headers });
  }
}
