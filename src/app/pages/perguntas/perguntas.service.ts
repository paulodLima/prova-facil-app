import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {
  AlternativaErradaRequest,
  AlternativaErradaResponse,
  AssuntoResponse,
  Page,
  PerguntaResponse, PerguntasResponse, PostPerguntaRequest,
  SerieResponse,
  ValidacaoInclusaoResponse
} from "./perguntas.interface";
import {environment} from '../../../environments/environment';
import {StorageService} from '../../guards/storage.service';

@Injectable({
  providedIn: 'root'
})

export class PerguntasService {
  private url = environment.url;

  constructor(private http: HttpClient,private storage: StorageService) {
  }

  validacoesInclusaoDocumento(cdCentrus: number): Observable<ValidacaoInclusaoResponse> {
    return this.http.get<ValidacaoInclusaoResponse>(`${this.url}/validar-inclusao/${cdCentrus}`);
  }

  getPeguntas(): Observable<Page<PerguntaResponse>> {
    return this.http.get<Page<PerguntaResponse>>(`${this.url}/api/perguntas`, {headers: this.getHeaders()});
  }

  getSeries(): Observable<SerieResponse[]> {
    return this.http.get<SerieResponse[]>(`${this.url}/api/serie`, {headers: this.getHeaders()});
  }

  getHeaders(): HttpHeaders {
    const token = this.storage.getItem('jwt_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
  }

  getPerguntaPorId(id: string): Observable<PerguntaResponse> {
    return this.http.get<PerguntaResponse>(`${this.url}/api/perguntas/${id}`, {headers: this.getHeaders()});
  }

  getAssunto() {
    return this.http.get<AssuntoResponse[]>(`${this.url}/api/assunto`, {headers: this.getHeaders()});
  }

  getDificuldade() {
    return this.http.get<SerieResponse[]>(`${this.url}/api/serie`, {headers: this.getHeaders()});
  }

  deleteAlternativaErrada(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/alternativa-errada/${id}`, {headers: this.getHeaders()});
  }

  criarAlternativaErrada(res: AlternativaErradaRequest): Observable<any> {
    return this.http.post<any>(`${this.url}/api/alternativa-errada`,res, {headers: this.getHeaders()});
  }

  atualizarAlternativaErrada(res: AlternativaErradaResponse): Observable<any> {
    return this.http.put<any>(`${this.url}/api/alternativa-errada/${res.id}`,res, {headers: this.getHeaders()});
  }

  atualizarPergunta(pergunta: PerguntasResponse) {
    return this.http.put<any>(`${this.url}/api/perguntas`,pergunta, {headers: this.getHeaders()});
  }

  criarPergunta(pergunta: PostPerguntaRequest) {
    return this.http.post<any>(`${this.url}/api/perguntas`,pergunta, {headers: this.getHeaders()});
  }

  excluirPergunta(id: number) {
      return this.http.delete<any>(`${this.url}/api/perguntas/${id}`, {headers: this.getHeaders()});
  }
}
