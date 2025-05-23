
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        localStorage.removeItem('jwt_token');
        messageService.add({
          severity: 'warn',
          summary: 'Sessão expirada',
          detail: 'Faça login novamente.'
        });
        router.navigate(['/auth/login']);
      }
      throw error;
    })
  );
};
