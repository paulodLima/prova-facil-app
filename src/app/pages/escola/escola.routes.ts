import {Routes} from "@angular/router";

export const escolaRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./escola-form/escola-form.component').then((m) => m.EscolaFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./escola-form/escola-form.component').then((m) => m.EscolaFormComponent)
  },
];
