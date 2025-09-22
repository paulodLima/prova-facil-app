import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { Reset } from './reset';
import { CriarConta } from './criar-conta';
import {CriarEscola} from './criar-escola';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'reset/:token', component: Reset },
    { path: 'criar-conta', component: CriarConta },
    {path: 'criar-escola', component: CriarEscola},
] as Routes;
