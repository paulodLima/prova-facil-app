import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {StorageService} from '../../guards/storage.service';
import {Observable} from 'rxjs';
import {PostSerieRequest} from './serie.interface';
import {AlternativaErradaResponse, PerguntaResponse, SerieResponse} from '../perguntas/perguntas.interface';

@Injectable({
  providedIn: 'root'
})

export class SerieService {
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

  cadastrarSerie(serie: PostSerieRequest): Observable<any> {
    return this.http.post<any>(
      `${this.url}/api/serie`,
      serie,
      { headers: this.getHeaders() }
    );
  }

  excluirSerie(id: number) {
    return this.http.delete<any>(`${this.url}/api/serie/${id}`, {headers: this.getHeaders()});
  }

  getSeriePorId(id: string): Observable<SerieResponse> {
    return this.http.get<SerieResponse>(`${this.url}/api/serie/${id}`, {headers: this.getHeaders()});
  }

  atualizarSerie(res: PostSerieRequest, id: number): Observable<any> {
    return this.http.put<any>(`${this.url}/api/serie/${id}`,res, {headers: this.getHeaders()});
  }
}
