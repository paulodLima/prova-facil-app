import { Routes } from '@angular/router';
import {AppLayout} from './layout/component/app.layout';
import {ConsultarDocumentoComponent} from './pages/documento/consultar-documento/consultar-documento.component';
import {PerguntasFormComponent} from './pages/perguntas/perguntas-form/perguntas-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
  ,{
    path: 'inicio',
    component: AppLayout,
    children: [
      { path: 'perguntas', loadChildren: () => import('./pages/perguntas/perguntas.module').then(m => m.PerguntasModule)},
    ]
  },
  //{ path: 'criar-conta', loadChildren: () => import('./pages/professor/professor.module').then(m => m.ProfessorModule)},
  //{ path: 'perguntas', loadChildren: () => import('./pages/perguntas/perguntas.module').then(m => m.ProfessorModule)},
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' }
];
