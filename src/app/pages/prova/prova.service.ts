import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {StorageService} from '../../guards/storage.service';
import { ProvaRequest} from './prova.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProvaService {
  private url = environment.url;

  constructor(private http: HttpClient,private storage: StorageService) {
  }
  getHeaders(): HttpHeaders {
    const token = this.storage.getItem('jwt_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
  }

  gerar(dados: ProvaRequest) {
    return this.http.post<any>(`${this.url}/api/prova/gerar`,dados, {headers: this.getHeaders()});
  }

  gerarPdf(dados: ProvaRequest): Observable<Blob> {
    const token = this.storage.getItem('jwt_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/pdf'
    });

    return this.http.post(`${this.url}/api/prova/avaliacao/pdf`,dados, {
      headers,
      responseType: 'blob'
    });
  }
}
