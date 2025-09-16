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
    return this.http.get<SerieResponse[]>(`${this.url}/api/serie/professor`, {headers: this.getHeaders()});
  }

  getHeaders(): HttpHeaders {
    const token = this.storage.getItem('jwt_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
  }

  getUploadHeaders(): HttpHeaders {
    const token = this.storage.getItem('jwt_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
      // não define Content-Type aqui!
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

  criarPergunta(data: FormData) {
    for (const pair of data.entries()) {
      if (pair[0] === "request" && pair[1] instanceof Blob) {
        const blob = pair[1] as Blob;
        blob.text().then(json => {
          console.log("➡️ Request JSON:", JSON.parse(json));
        });
      } else if (pair[0] === "arquivo" && pair[1] instanceof File) {
        const file = pair[1] as File;
        console.log("➡️ Arquivo:", {
          nome: file.name,
          tipo: file.type,
          tamanho: file.size,
          ultimoModificado: file.lastModified,
        });
      } else {
        console.log("Outro campo:", pair[0], pair[1]);
      }
    }

    return this.http.post<any>(`${this.url}/api/perguntas`,data, {headers: this.getUploadHeaders()});
  }

  excluirPergunta(id: number) {
      return this.http.delete<any>(`${this.url}/api/perguntas/${id}`, {headers: this.getHeaders()});
  }
}
