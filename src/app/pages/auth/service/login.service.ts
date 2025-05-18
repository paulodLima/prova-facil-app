import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, take, tap} from "rxjs";
import {environment} from '../../../../environments/environment';
import {LoginRequest, PostProfessorRequest} from '../interface/login.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private url = environment.url;

  constructor(private http: HttpClient,private router: Router) {
  }

  cadastrarProfessorLogin(request: PostProfessorRequest): Observable<void> {
    return this.http.post<void>(`${this.url}/api/professor`,request).pipe(take(1));
  }
  loginProfessor(request: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.url}/login`,request,{ observe: 'response' }).pipe(
        tap(response => {
          const authHeader = response.headers.get('Authorization');
          if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '');
            localStorage.setItem('jwt_token', token);
          }
        })
      );
  }
  logout() {
    console.log(this.getToken())
    this.router.navigate(['/auth/login'])
    localStorage.removeItem('jwt_token');
    console.log("passandoo aqui")
    console.log(this.getToken())
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
}
