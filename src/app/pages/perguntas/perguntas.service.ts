import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {
  PlanosDTO,
  ValidacaoInclusaoResponse
} from "./perguntas.interface";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PerguntasService {
  private url = environment.url.concat('inclusao-documento');

  constructor(private http: HttpClient) {
  }

  validacoesInclusaoDocumento(cdCentrus: number): Observable<ValidacaoInclusaoResponse> {
    return this.http.get<ValidacaoInclusaoResponse>(`${this.url}/validar-inclusao/${cdCentrus}`);
  }

  validarTipoEvento(tpEv: number | undefined) {
    return this.http.get<string>(`${this.url}/validar-tipo-evento/${tpEv}`);
  }

  planos() {
    return this.http.get<PlanosDTO[]>(`${this.url}/planos`);
  }
}
