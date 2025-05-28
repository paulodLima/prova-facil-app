import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {StorageService} from '../../guards/storage.service';
import {Observable} from 'rxjs';
import {PostSerieRequest} from './assunto.interface';
import {
  AlternativaErradaResponse,
  AssuntoResponse,
  PerguntaResponse,
  SerieResponse
} from '../perguntas/perguntas.interface';

@Injectable({
  providedIn: 'root'
})

export class AssuntoService {
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

  cadastrarAssunto(serie: PostSerieRequest): Observable<any> {
    return this.http.post<any>(
      `${this.url}/api/assunto`,
      serie,
      { headers: this.getHeaders() }
    );
  }

  excluirAssunto(id: number) {
    return this.http.delete<any>(`${this.url}/api/assunto/${id}`, {headers: this.getHeaders()});
  }

  getAssuntoPorId(id: string): Observable<AssuntoResponse> {
    return this.http.get<AssuntoResponse>(`${this.url}/api/assunto/${id}`, {headers: this.getHeaders()});
  }

  atualizarAssunto(res: PostSerieRequest, id: number): Observable<any> {
    return this.http.put<any>(`${this.url}/api/assunto/${id}`,res, {headers: this.getHeaders()});
  }
}
