import { Routes } from '@angular/router';
import {AppLayout} from './layout/component/app.layout';
import {ConsultarDocumentoComponent} from './pages/documento/consultar-documento/consultar-documento.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'consultar-documentos', component:  ConsultarDocumentoComponent},
    ]
  },
  { path: '**', redirectTo: '/notfound' }
];
