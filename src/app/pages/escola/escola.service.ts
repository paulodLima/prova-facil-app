import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {StorageService} from '../../guards/storage.service';

@Injectable({
  providedIn: 'root'
})

export class EscolaService {
  private url = environment.url;

  constructor(private http: HttpClient,private storage: StorageService) {
  }

  getHeaders(): HttpHeaders {
    const token = this.storage.getItem('jwt_token');
    return new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
  }
  getUploadHeaders(): HttpHeaders {
    const token = this.storage.getItem('jwt_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  corrigirGabarito(formData: any) {
    return this.http.post<any>(`${this.url}/corrigir`,formData);
  }

  cadastrarEscola(formData: FormData) {
    return this.http.post<any>(`${this.url}/api/escola`,formData);
  }
}
