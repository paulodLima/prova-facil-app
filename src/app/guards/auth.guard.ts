import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService) {}

  canActivate(): boolean {
    const token = this.storage.getItem('jwt_token');

    if (token) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
