import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { CriarConta } from './criar-conta';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'criar-conta', component: CriarConta }
] as Routes;
