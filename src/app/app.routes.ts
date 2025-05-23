import { Routes } from '@angular/router';
import {AppLayout} from './layout/component/app.layout';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
  ,{
    path: 'inicio',
    component: AppLayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'perguntas', loadChildren: () => import('./pages/perguntas/perguntas.module').then(m => m.PerguntasModule)},
    ]
  },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.routes') },
];
