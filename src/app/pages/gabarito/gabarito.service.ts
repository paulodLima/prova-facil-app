import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {StorageService} from '../../guards/storage.service';

@Injectable({
  providedIn: 'root'
})

export class GabaritoService {
  private url = environment.urlPy;

  constructor(private http: HttpClient,private storage: StorageService) {
  }

  getHeaders(): HttpHeaders {
    const token = this.storage.getItem('jwt_token');
    return new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
  }
  corrigirGabarito(formData: any) {
    console.log(formData)
    return this.http.post<any>(`${this.url}/corrigir`,formData);
  }
}
