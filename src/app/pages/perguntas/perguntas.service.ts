import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {
  Page,
  PerguntaResponse,
  SerieResponse,
  ValidacaoInclusaoResponse
} from "./perguntas.interface";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PerguntasService {
  private url = environment.url;

  constructor(private http: HttpClient) {
  }

  validacoesInclusaoDocumento(cdCentrus: number): Observable<ValidacaoInclusaoResponse> {
    return this.http.get<ValidacaoInclusaoResponse>(`${this.url}/validar-inclusao/${cdCentrus}`);
  }

  getPeguntas():Observable<Page<PerguntaResponse>> {
    return this.http.get<Page<PerguntaResponse>>(`${this.url}/api/perguntas`,{headers: this.getHeaders()});
  }

  getSeries() :Observable<SerieResponse[]> {
    return this.http.get<SerieResponse[]>(`${this.url}/api/serie`,{headers: this.getHeaders()});
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
  }
}
