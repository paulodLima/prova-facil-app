import { Routes } from '@angular/router';
import {AppLayout} from './layout/component/app.layout';
import {ConsultarDocumentoComponent} from './pages/documento/consultar-documento/consultar-documento.component';
import {PerguntasFormComponent} from './pages/perguntas/perguntas-form/perguntas-form.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'perguntas', component:  PerguntasFormComponent},
    ]
  },
  { path: '**', redirectTo: '/notfound' }
];
