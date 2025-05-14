import {Routes} from "@angular/router";

export const documentoRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./consultar-documento/consultar-documento.component').then((m) => m.ConsultarDocumentoComponent)
  }
];
